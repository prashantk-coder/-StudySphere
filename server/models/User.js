// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},

		// Define the password field with type String and required
		password: {
			type: String,
			required: function () {
				return !this.googleId;
			},
		},
		googleId: {
			type: String,
			index: true,
			sparse: true,
		},
		// Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
		accountType: {
			type: String,
			enum: ["Admin", "Student", "Instructor"],
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		approved: {
			type: Boolean,
			default: true,
		},
		additionalDetails: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Profile",
		},
		courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		token: {
			type: String,
		},
		refreshTokenHash: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			required: true,
		},
		courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress",
			},
		],

		// Student wishlist
		wishlist: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		xp: {
			type: Number,
			default: 0,
		},
		learningStreak: {
			current: { type: Number, default: 0 },
			longest: { type: Number, default: 0 },
			lastStudiedAt: { type: Date },
		},
		badges: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Badge",
			},
		],
		subscriptions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Subscription",
			},
		],
		preferences: {
			language: { type: String, default: "en" },
			theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
			emailNotifications: { type: Boolean, default: true },
		},

		// Add timestamps for when the document is created and last modified
	},
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);
