const mongoose = require("mongoose");

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
	courseName: { type: String },
	courseDescription: { type: String },
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	whatYouWillLearn: {
		type: String,
	},
	courseContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	price: {
		type: Number,
	},
	thumbnail: {
		type: String,
	},
	tag: {
		type: [String],
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	approvalStatus: {
		type: String,
		enum: ["Pending", "Approved", "Rejected"],
		default: "Pending",
		index: true,
	},
	level: {
		type: String,
		enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
		default: "All Levels",
	},
	language: {
		type: String,
		default: "English",
	},
	estimatedHours: {
		type: Number,
		default: 0,
	},
	subscriptionEligible: {
		type: Boolean,
		default: true,
	},
	metrics: {
		views: { type: Number, default: 0 },
		wishlistCount: { type: Number, default: 0 },
		completionRate: { type: Number, default: 0 },
	},
	createdAt: {
		type:Date,
		default:Date.now
	},
});

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);
