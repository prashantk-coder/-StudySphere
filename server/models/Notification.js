const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
		audience: { type: String, enum: ["user", "students", "instructors", "admins", "all"], default: "user" },
		type: {
			type: String,
			enum: ["system", "payment", "course", "chat", "challenge", "certificate", "moderation"],
			default: "system",
		},
		title: { type: String, required: true },
		message: { type: String, required: true },
		actionUrl: { type: String },
		readAt: { type: Date },
		metadata: { type: mongoose.Schema.Types.Mixed },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
