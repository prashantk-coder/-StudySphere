const crypto = require("crypto");
const mongoose = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

const INR = "INR";

const createReceipt = (prefix = "ss") => `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;

const verifyRazorpaySignature = (body, signature, secret = process.env.RAZORPAY_SECRET) => {
	const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");
	const provided = Buffer.from(signature || "");
	const expected = Buffer.from(expectedSignature);
	return provided.length === expected.length && crypto.timingSafeEqual(expected, provided);
};

const buildCourseOrder = async ({ courses, userId, couponCode }) => {
	if (!Array.isArray(courses) || courses.length === 0) {
		const error = new Error("Please provide at least one course");
		error.statusCode = 400;
		throw error;
	}

	const courseDocs = await Course.find({ _id: { $in: courses } }).populate("instructor", "firstName lastName");
	if (courseDocs.length !== courses.length) {
		const error = new Error("One or more courses could not be found");
		error.statusCode = 404;
		throw error;
	}

	let totalAmount = 0;
	const uid = new mongoose.Types.ObjectId(userId);
	const items = courseDocs.map((course) => {
		if (course.studentsEnrolled.some((student) => student.equals(uid))) {
			const error = new Error(`Already enrolled in ${course.courseName}`);
			error.statusCode = 409;
			throw error;
		}

		totalAmount += Number(course.price || 0);
		return {
			course: course._id,
			title: course.courseName,
			price: Number(course.price || 0),
			instructor: course.instructor?._id,
		};
	});

	const receipt = createReceipt("course");
	const order = await Order.create({
		user: userId,
		items,
		amount: totalAmount * 100,
		currency: INR,
		receipt,
		couponCode,
	});

	const razorpayOrder = await instance.orders.create({
		amount: order.amount,
		currency: INR,
		receipt,
		notes: {
			studySphereOrderId: order._id.toString(),
			userId: userId.toString(),
			couponCode: couponCode || "",
		},
	});

	order.razorpayOrderId = razorpayOrder.id;
	order.notes = new Map(Object.entries(razorpayOrder.notes || {}));
	await order.save();

	return { order, razorpayOrder };
};

exports.createCourseOrder = async (req, res) => {
	try {
		const { courses, couponCode } = req.body;
		const { order, razorpayOrder } = await buildCourseOrder({
			courses,
			couponCode,
			userId: req.user.id,
		});

		return res.status(201).json({
			success: true,
			data: {
				orderId: order._id,
				razorpayOrder,
				amount: order.amount,
				currency: order.currency,
				key: process.env.RAZORPAY_KEY,
			},
		});
	} catch (error) {
		return res.status(error.statusCode || 500).json({ success: false, message: error.message });
	}
};

// Backward-compatible endpoint used by the existing frontend.
exports.capturePayment = async (req, res) => {
	try {
		const { order, razorpayOrder } = await buildCourseOrder({
			courses: req.body.courses,
			couponCode: req.body.couponCode,
			userId: req.user.id,
		});

		return res.json({
			success: true,
			data: razorpayOrder,
			message: razorpayOrder,
			orderId: order._id,
		});
	} catch (error) {
		return res.status(error.statusCode || 500).json({ success: false, message: error.message });
	}
};

exports.verifyPayment = async (req, res) => {
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
	const userId = req.user.id;

	if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
		return res.status(400).json({ success: false, message: "Payment details are incomplete" });
	}

	try {
		const body = `${razorpay_order_id}|${razorpay_payment_id}`;
		if (!verifyRazorpaySignature(body, razorpay_signature)) {
			await Payment.create({
				user: userId,
				razorpayOrderId: razorpay_order_id,
				razorpayPaymentId: razorpay_payment_id,
				razorpaySignature: razorpay_signature,
				amount: 0,
				status: "failed",
				error: { description: "Signature verification failed" },
			});
			return res.status(400).json({ success: false, message: "Payment signature verification failed" });
		}

		const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
		const razorpayPayment = await instance.payments.fetch(razorpay_payment_id);

		await Payment.findOneAndUpdate(
			{ razorpayPaymentId: razorpay_payment_id },
			{
				user: userId,
				order: order?._id,
				razorpayOrderId: razorpay_order_id,
				razorpayPaymentId: razorpay_payment_id,
				razorpaySignature: razorpay_signature,
				amount: razorpayPayment.amount || order?.amount || 0,
				currency: razorpayPayment.currency || INR,
				status: razorpayPayment.status === "captured" ? "captured" : razorpayPayment.status,
				method: razorpayPayment.method,
				email: razorpayPayment.email,
				contact: razorpayPayment.contact,
				raw: razorpayPayment,
			},
			{ upsert: true, new: true }
		);

		if (order) {
			order.status = "paid";
			order.razorpayPaymentId = razorpay_payment_id;
			order.invoice = {
				number: `INV-${order.receipt.toUpperCase()}`,
				issuedAt: new Date(),
			};
			await order.save();
		}

		await enrollStudents(courses, userId);
		return res.status(200).json({ success: true, message: "Payment verified and enrollment completed" });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.handleWebhook = async (req, res) => {
	const signature = req.headers["x-razorpay-signature"];
	const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_SECRET;
	const rawBody = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body);

	try {
		if (!verifyRazorpaySignature(rawBody, signature, secret)) {
			return res.status(400).json({ success: false, message: "Invalid webhook signature" });
		}

		const event = JSON.parse(rawBody);
		const paymentEntity = event.payload?.payment?.entity;
		const subscriptionEntity = event.payload?.subscription?.entity;
		const refundEntity = event.payload?.refund?.entity;

		if (paymentEntity) {
			await Payment.findOneAndUpdate(
				{ razorpayPaymentId: paymentEntity.id },
				{
					$set: {
						razorpayOrderId: paymentEntity.order_id,
						razorpayPaymentId: paymentEntity.id,
						amount: paymentEntity.amount,
						currency: paymentEntity.currency || INR,
						status: paymentEntity.status === "captured" ? "captured" : paymentEntity.status,
						method: paymentEntity.method,
						email: paymentEntity.email,
						contact: paymentEntity.contact,
						raw: paymentEntity,
					},
					$addToSet: { webhookEvents: event.event },
				},
				{ upsert: true, new: true }
			);
		}

		if (subscriptionEntity) {
			const subscriptionUpdateOptions = subscriptionEntity.notes?.userId
				? { upsert: true, new: true, setDefaultsOnInsert: true }
				: { new: true };
			await Subscription.findOneAndUpdate(
				{ razorpaySubscriptionId: subscriptionEntity.id },
				{
					$set: {
						razorpaySubscriptionId: subscriptionEntity.id,
						planId: subscriptionEntity.plan_id,
						planName: subscriptionEntity.notes?.planName || "StudySphere Pro",
						user: subscriptionEntity.notes?.userId,
						status: subscriptionEntity.status,
						totalCount: subscriptionEntity.total_count,
						paidCount: subscriptionEntity.paid_count,
						currentStart: subscriptionEntity.current_start ? new Date(subscriptionEntity.current_start * 1000) : undefined,
						currentEnd: subscriptionEntity.current_end ? new Date(subscriptionEntity.current_end * 1000) : undefined,
						chargeAt: subscriptionEntity.charge_at ? new Date(subscriptionEntity.charge_at * 1000) : undefined,
						endedAt: subscriptionEntity.ended_at ? new Date(subscriptionEntity.ended_at * 1000) : undefined,
						raw: subscriptionEntity,
					},
				},
				subscriptionUpdateOptions
			);
		}

		if (refundEntity) {
			await Payment.findOneAndUpdate(
				{ razorpayPaymentId: refundEntity.payment_id },
				{
					$push: {
						refunds: {
							refundId: refundEntity.id,
							amount: refundEntity.amount,
							status: refundEntity.status,
							reason: refundEntity.notes?.reason,
						},
					},
					$addToSet: { webhookEvents: event.event },
				}
			);
		}

		return res.json({ success: true });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.createSubscription = async (req, res) => {
	const { planId, planName = "StudySphere Pro", totalCount = 12, notes = {} } = req.body;
	if (!planId) return res.status(400).json({ success: false, message: "planId is required" });

	try {
		const subscription = await instance.subscriptions.create({
			plan_id: planId,
			total_count: totalCount,
			customer_notify: 1,
			notes: {
				...notes,
				userId: req.user.id,
				planName,
			},
		});

		const record = await Subscription.create({
			user: req.user.id,
			planId,
			planName,
			totalCount,
			razorpaySubscriptionId: subscription.id,
			status: subscription.status,
			raw: subscription,
			notes,
		});

		await User.findByIdAndUpdate(req.user.id, { $addToSet: { subscriptions: record._id } });

		return res.status(201).json({ success: true, data: { subscription, record } });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.cancelSubscription = async (req, res) => {
	try {
		const { subscriptionId } = req.params;
		const razorpaySubscription = await instance.subscriptions.cancel(subscriptionId);
		const subscription = await Subscription.findOneAndUpdate(
			{ razorpaySubscriptionId: subscriptionId, user: req.user.id },
			{ status: razorpaySubscription.status, endedAt: new Date(), raw: razorpaySubscription },
			{ new: true }
		);

		return res.json({ success: true, data: { razorpaySubscription, subscription } });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.getPurchaseHistory = async (req, res) => {
	const [orders, subscriptions] = await Promise.all([
		Order.find({ user: req.user.id }).populate("items.course", "courseName thumbnail").sort({ createdAt: -1 }),
		Subscription.find({ user: req.user.id }).sort({ createdAt: -1 }),
	]);

	return res.json({ success: true, data: { orders, subscriptions } });
};

exports.getInvoice = async (req, res) => {
	const order = await Order.findOne({ _id: req.params.orderId, user: req.user.id }).populate("items.course", "courseName");
	if (!order) return res.status(404).json({ success: false, message: "Invoice not found" });

	return res.json({
		success: true,
		data: {
			invoiceNumber: order.invoice?.number || `INV-${order.receipt.toUpperCase()}`,
			issuedAt: order.invoice?.issuedAt || order.createdAt,
			billTo: req.user.email,
			items: order.items,
			amount: order.amount,
			currency: order.currency,
			status: order.status,
		},
	});
};

exports.createRefund = async (req, res) => {
	const { paymentId, amount, reason } = req.body;
	if (!paymentId) return res.status(400).json({ success: false, message: "paymentId is required" });

	try {
		const refund = await instance.payments.refund(paymentId, {
			amount,
			notes: { reason: reason || "Admin refund" },
		});

		const payment = await Payment.findOneAndUpdate(
			{ razorpayPaymentId: paymentId },
			{
				status: amount ? "partially_refunded" : "refunded",
				$push: {
					refunds: {
						refundId: refund.id,
						amount: refund.amount,
						status: refund.status,
						reason,
					},
				},
			},
			{ new: true }
		);

		return res.status(201).json({ success: true, data: { refund, payment } });
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

exports.sendPaymentSuccessEmail = async (req, res) => {
	const { orderId, paymentId, amount } = req.body;
	const userId = req.user.id;

	if (!orderId || !paymentId || !amount || !userId) {
		return res.status(400).json({ success: false, message: "Please provide all the details" });
	}

	try {
		const enrolledStudent = await User.findById(userId);
		await mailSender(
			enrolledStudent.email,
			"Payment Received",
			paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`, amount / 100, orderId, paymentId)
		);
		return res.json({ success: true, message: "Payment success email sent" });
	} catch (error) {
		return res.status(400).json({ success: false, message: "Could not send email" });
	}
};

const enrollStudents = async (courses, userId) => {
	if (!Array.isArray(courses) || !userId) {
		const error = new Error("Please provide Course ID and User ID");
		error.statusCode = 400;
		throw error;
	}

	for (const courseId of courses) {
		const enrolledCourse = await Course.findOneAndUpdate(
			{ _id: courseId, studentsEnrolled: { $ne: userId } },
			{ $push: { studentsEnrolled: userId } },
			{ new: true }
		);

		if (!enrolledCourse) continue;

		const courseProgress = await CourseProgress.create({
			courseID: courseId,
			userId,
			completedVideos: [],
		});

		const enrolledStudent = await User.findByIdAndUpdate(
			userId,
			{
				$addToSet: { courses: courseId },
				$push: { courseProgress: courseProgress._id },
				$inc: { xp: 25 },
			},
			{ new: true }
		);

		if (enrolledStudent?.email) {
			await mailSender(
				enrolledStudent.email,
				`Successfully Enrolled into ${enrolledCourse.courseName}`,
				courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
			);
		}
	}
};
