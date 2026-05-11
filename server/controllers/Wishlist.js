const User = require("../models/User")

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist").exec()
    return res.status(200).json({ success: true, data: user?.wishlist || [] })
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message })
  }
}

exports.addToWishlist = async (req, res) => {
  try {
    const { courseId } = req.body
    if (!courseId) {
      return res.status(400).json({ success: false, message: "courseId is required" })
    }
    await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { wishlist: courseId } },
      { new: true }
    )
    return res.status(200).json({ success: true, message: "Added to wishlist" })
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message })
  }
}

exports.removeFromWishlist = async (req, res) => {
  try {
    const { courseId } = req.body
    if (!courseId) {
      return res.status(400).json({ success: false, message: "courseId is required" })
    }
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { wishlist: courseId } },
      { new: true }
    )
    return res.status(200).json({ success: true, message: "Removed from wishlist" })
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message })
  }
}

