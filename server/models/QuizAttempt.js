const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
	{
		questionId: { type: String, required: true },
		answer: { type: mongoose.Schema.Types.Mixed },
		isCorrect: { type: Boolean, default: false },
		points: { type: Number, default: 0 },
	},
	{ _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
		course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, index: true },
		section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
		subSection: { type: mongoose.Schema.Types.ObjectId, ref: "SubSection" },
		answers: [answerSchema],
		score: { type: Number, default: 0 },
		maxScore: { type: Number, default: 0 },
		passed: { type: Boolean, default: false },
		timeSpentSeconds: { type: Number, default: 0 },
		submittedAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
