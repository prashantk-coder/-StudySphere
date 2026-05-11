const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		roomId: { type: String, required: true, index: true },
		course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		messageType: { type: String, enum: ["text", "markdown", "image", "file", "system"], default: "text" },
		body: { type: String, required: true },
		attachments: [
			{
				url: String,
				publicId: String,
				resourceType: String,
				name: String,
			},
		],
		readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		editedAt: { type: Date },
		deletedAt: { type: Date },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
