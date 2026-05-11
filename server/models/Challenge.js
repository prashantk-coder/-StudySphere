const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		type: { type: String, enum: ["daily", "weekly", "course", "coding"], default: "daily", index: true },
		startsAt: { type: Date, required: true },
		endsAt: { type: Date, required: true },
		xpReward: { type: Number, default: 50 },
		badge: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" },
		course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
		tasks: [
			{
				label: String,
				target: Number,
				metric: String,
			},
		],
		participants: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				progress: { type: Number, default: 0 },
				completedAt: Date,
			},
		],
		active: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);
