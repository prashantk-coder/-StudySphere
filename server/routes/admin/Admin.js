const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../../middlewares/auth");
const adminController = require("../../controllers/admin/adminController");

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get("/analytics", auth, isAdmin, asyncHandler(adminController.getAnalytics));
router.get("/users", auth, isAdmin, asyncHandler(adminController.getUsers));
router.patch("/users/:userId/status", auth, isAdmin, asyncHandler(adminController.updateUserStatus));
router.get("/courses/pending", auth, isAdmin, asyncHandler(adminController.getPendingCourses));
router.patch("/courses/:courseId/approval", auth, isAdmin, asyncHandler(adminController.updateCourseApproval));
router.get("/payments", auth, isAdmin, asyncHandler(adminController.getPayments));

module.exports = router;
