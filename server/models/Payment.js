const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema(
	{
		refundId: { type: String },
		amount: { type: Number },
		status: { type: String },
		reason: { type: String },
		createdAt: { type: Date, default: Date.now },
	},
	{ _id: false }
);

const paymentSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
		order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", index: true },
		razorpayOrderId: { type: String, index: true },
		razorpayPaymentId: { type: String, unique: true, sparse: true },
		razorpaySignature: { type: String },
		amount: { type: Number, required: true },
		currency: { type: String, default: "INR" },
		status: {
			type: String,
			enum: ["created", "authorized", "captured", "failed", "refunded", "partially_refunded"],
			default: "created",
			index: true,
		},
		method: { type: String },
		email: { type: String },
		contact: { type: String },
		error: {
			code: String,
			description: String,
			source: String,
			step: String,
			reason: String,
		},
		refunds: [refundSchema],
		webhookEvents: [{ type: String }],
		raw: { type: mongoose.Schema.Types.Mixed },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
