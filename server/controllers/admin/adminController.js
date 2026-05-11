const User = require("../../models/User");
const Course = require("../../models/Course");
const Order = require("../../models/Order");
const Payment = require("../../models/Payment");

exports.getAnalytics = async (_req, res) => {
	const [users, courses, orders, payments] = await Promise.all([
		User.countDocuments(),
		Course.countDocuments(),
		Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 }, amount: { $sum: "$amount" } } }]),
		Payment.aggregate([{ $match: { status: "captured" } }, { $group: { _id: null, revenue: { $sum: "$amount" }, count: { $sum: 1 } } }]),
	]);

	return res.json({
		success: true,
		data: {
			users,
			courses,
			orders,
			revenue: payments[0]?.revenue || 0,
			successfulPayments: payments[0]?.count || 0,
		},
	});
};

exports.getUsers = async (req, res) => {
	const { role, active } = req.query;
	const filter = {};
	if (role) filter.accountType = role;
	if (active !== undefined) filter.active = active === "true";

	const users = await User.find(filter)
		.select("-password -token -refreshTokenHash")
		.sort({ createdAt: -1 })
		.limit(200);

	return res.json({ success: true, data: users });
};

exports.updateUserStatus = async (req, res) => {
	const { userId } = req.params;
	const { active, approved } = req.body;
	const update = {};
	if (typeof active === "boolean") update.active = active;
	if (typeof approved === "boolean") update.approved = approved;

	const user = await User.findByIdAndUpdate(userId, update, { new: true }).select("-password -token -refreshTokenHash");
	if (!user) return res.status(404).json({ success: false, message: "User not found" });

	return res.json({ success: true, data: user });
};

exports.getPendingCourses = async (_req, res) => {
	const courses = await Course.find({ approvalStatus: "Pending" })
		.populate("instructor", "firstName lastName email")
		.sort({ createdAt: -1 });

	return res.json({ success: true, data: courses });
};

exports.updateCourseApproval = async (req, res) => {
	const { courseId } = req.params;
	const { approvalStatus } = req.body;
	if (!["Pending", "Approved", "Rejected"].includes(approvalStatus)) {
		return res.status(400).json({ success: false, message: "Invalid approval status" });
	}

	const course = await Course.findByIdAndUpdate(courseId, { approvalStatus }, { new: true });
	if (!course) return res.status(404).json({ success: false, message: "Course not found" });

	return res.json({ success: true, data: course });
};

exports.getPayments = async (_req, res) => {
	const payments = await Payment.find()
		.populate("user", "firstName lastName email")
		.populate("order")
		.sort({ createdAt: -1 })
		.limit(200);

	return res.json({ success: true, data: payments });
};
