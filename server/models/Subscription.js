const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
		planId: { type: String, required: true },
		planName: { type: String, required: true },
		razorpaySubscriptionId: { type: String, unique: true, sparse: true },
		status: {
			type: String,
			enum: ["created", "authenticated", "active", "pending", "halted", "cancelled", "completed", "expired"],
			default: "created",
			index: true,
		},
		totalCount: { type: Number, default: 12 },
		paidCount: { type: Number, default: 0 },
		currentStart: { type: Date },
		currentEnd: { type: Date },
		chargeAt: { type: Date },
		endedAt: { type: Date },
		notes: { type: Map, of: String },
		raw: { type: mongoose.Schema.Types.Mixed },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
