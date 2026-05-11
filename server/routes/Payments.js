// Import the required modules
const express = require("express")
const router = express.Router()

const {
	capturePayment,
	createCourseOrder,
	verifyPayment,
	handleWebhook,
	createSubscription,
	cancelSubscription,
	getPurchaseHistory,
	getInvoice,
	createRefund,
	sendPaymentSuccessEmail,
} = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/orders", auth, isStudent, createCourseOrder)
router.post("/verifyPayment",auth, isStudent, verifyPayment)
router.post("/verify", auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
router.post("/webhook", handleWebhook)
router.post("/subscriptions", auth, isStudent, createSubscription)
router.post("/subscriptions/:subscriptionId/cancel", auth, isStudent, cancelSubscription)
router.get("/history", auth, getPurchaseHistory)
router.get("/invoices/:orderId", auth, getInvoice)
router.post("/refunds", auth, isAdmin, createRefund)

module.exports = router
