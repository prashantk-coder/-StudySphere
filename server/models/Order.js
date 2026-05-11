const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
	{
		course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
		title: { type: String, required: true },
		price: { type: Number, required: true },
		instructor: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
		items: [orderItemSchema],
		amount: { type: Number, required: true },
		currency: { type: String, default: "INR" },
		status: {
			type: String,
			enum: ["created", "paid", "failed", "refunded", "partially_refunded"],
			default: "created",
			index: true,
		},
		razorpayOrderId: { type: String, unique: true, sparse: true },
		razorpayPaymentId: { type: String },
		receipt: { type: String, required: true, unique: true },
		couponCode: { type: String },
		invoice: {
			number: { type: String },
			issuedAt: { type: Date },
			downloadUrl: { type: String },
		},
		notes: { type: Map, of: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
