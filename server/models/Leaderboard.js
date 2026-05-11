const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
		scope: { type: String, enum: ["global", "course", "challenge"], default: "global", index: true },
		course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
		challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
		xp: { type: Number, default: 0, index: true },
		streak: { type: Number, default: 0 },
		rankSnapshot: { type: Number },
		lastActivityAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

leaderboardSchema.index({ scope: 1, xp: -1 });

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
