const crypto = require("crypto");
const Notification = require("../../models/Notification");
const Message = require("../../models/Message");
const QuizAttempt = require("../../models/QuizAttempt");
const Certificate = require("../../models/Certificate");
const Leaderboard = require("../../models/Leaderboard");
const Challenge = require("../../models/Challenge");

exports.getNotifications = async (req, res) => {
	const notifications = await Notification.find({
		$or: [{ user: req.user.id }, { audience: "all" }, { audience: `${req.user.accountType?.toLowerCase()}s` }],
	})
		.sort({ createdAt: -1 })
		.limit(50);

	return res.json({ success: true, data: notifications });
};

exports.markNotificationsRead = async (req, res) => {
	const { notificationIds = [] } = req.body;
	await Notification.updateMany(
		{ _id: { $in: notificationIds }, user: req.user.id },
		{ $set: { readAt: new Date() } }
	);

	return res.json({ success: true, message: "Notifications marked as read" });
};

exports.createMessage = async (req, res) => {
	const { roomId, body, messageType = "text", course, attachments = [] } = req.body;
	if (!roomId || !body) {
		return res.status(400).json({ success: false, message: "roomId and body are required" });
	}

	const message = await Message.create({
		roomId,
		body,
		messageType,
		course,
		attachments,
		sender: req.user.id,
		readBy: [req.user.id],
	});

	req.app.get("io")?.to(roomId).emit("chat_message", message);
	return res.status(201).json({ success: true, data: message });
};

exports.getMessages = async (req, res) => {
	const { roomId } = req.params;
	const messages = await Message.find({ roomId, deletedAt: null })
		.populate("sender", "firstName lastName image accountType")
		.sort({ createdAt: -1 })
		.limit(100);

	return res.json({ success: true, data: messages.reverse() });
};

exports.createQuizAttempt = async (req, res) => {
	const { course, section, subSection, answers = [], maxScore = 0, timeSpentSeconds = 0 } = req.body;
	const score = answers.reduce((sum, answer) => sum + Number(answer.points || 0), 0);
	const attempt = await QuizAttempt.create({
		user: req.user.id,
		course,
		section,
		subSection,
		answers,
		score,
		maxScore,
		timeSpentSeconds,
		passed: maxScore > 0 ? score / maxScore >= 0.7 : false,
	});

	await Leaderboard.findOneAndUpdate(
		{ user: req.user.id, scope: "global" },
		{ $inc: { xp: Math.max(score, 0) }, $set: { lastActivityAt: new Date() } },
		{ upsert: true, new: true }
	);

	return res.status(201).json({ success: true, data: attempt });
};

exports.issueCertificate = async (req, res) => {
	const { course, certificateUrl } = req.body;
	if (!course) {
		return res.status(400).json({ success: false, message: "course is required" });
	}

	const certificate = await Certificate.findOneAndUpdate(
		{ user: req.user.id, course },
		{
			$setOnInsert: {
				certificateId: `SS-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
				verificationCode: crypto.randomBytes(12).toString("hex"),
				certificateUrl,
				issuedAt: new Date(),
			},
		},
		{ upsert: true, new: true }
	);

	return res.status(201).json({ success: true, data: certificate });
};

exports.getLeaderboard = async (req, res) => {
	const { scope = "global", course, challenge } = req.query;
	const filter = { scope };
	if (course) filter.course = course;
	if (challenge) filter.challenge = challenge;

	const leaderboard = await Leaderboard.find(filter)
		.populate("user", "firstName lastName image")
		.sort({ xp: -1, lastActivityAt: 1 })
		.limit(100);

	return res.json({ success: true, data: leaderboard });
};

exports.getTodayChallenge = async (req, res) => {
	const now = new Date();
	const challenge = await Challenge.findOne({
		active: true,
		startsAt: { $lte: now },
		endsAt: { $gte: now },
	}).sort({ xpReward: -1 });

	return res.json({ success: true, data: challenge });
};
