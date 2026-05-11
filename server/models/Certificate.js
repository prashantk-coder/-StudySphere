const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
		course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
		certificateId: { type: String, required: true, unique: true },
		verificationCode: { type: String, required: true, unique: true },
		certificateUrl: { type: String },
		issuedAt: { type: Date, default: Date.now },
		expiresAt: { type: Date },
		metadata: { type: mongoose.Schema.Types.Mixed },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
