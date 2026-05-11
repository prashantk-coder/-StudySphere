const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const platformController = require("../../controllers/platform/platformController");

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get("/notifications", auth, asyncHandler(platformController.getNotifications));
router.post("/notifications/read", auth, asyncHandler(platformController.markNotificationsRead));
router.post("/messages", auth, asyncHandler(platformController.createMessage));
router.get("/messages/:roomId", auth, asyncHandler(platformController.getMessages));
router.post("/quiz-attempts", auth, asyncHandler(platformController.createQuizAttempt));
router.post("/certificates", auth, asyncHandler(platformController.issueCertificate));
router.get("/leaderboard", auth, asyncHandler(platformController.getLeaderboard));
router.get("/challenges/today", auth, asyncHandler(platformController.getTodayChallenge));

module.exports = router;
