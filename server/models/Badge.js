const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		icon: { type: String },
		xpReward: { type: Number, default: 0 },
		rarity: { type: String, enum: ["common", "rare", "epic", "legendary"], default: "common" },
		criteria: { type: mongoose.Schema.Types.Mixed },
		earnedBy: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				earnedAt: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Badge", badgeSchema);
