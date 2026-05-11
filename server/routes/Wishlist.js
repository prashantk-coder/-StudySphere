const express = require("express")
const router = express.Router()

const { auth, isStudent } = require("../middlewares/auth")
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controllers/Wishlist")

router.get("/", auth, isStudent, getWishlist)
router.post("/add", auth, isStudent, addToWishlist)
router.post("/remove", auth, isStudent, removeFromWishlist)

module.exports = router

