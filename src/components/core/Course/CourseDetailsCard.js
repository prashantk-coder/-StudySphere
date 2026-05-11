import React from "react"

import copy from "copy-to-clipboard"

import { toast } from "react-hot-toast"

import {
  BsFillCaretRightFill,
} from "react-icons/bs"

import {
  FaShareSquare,
} from "react-icons/fa"

import {
  FiClock,
  FiShield,
  FiUsers,
} from "react-icons/fi"

import {
  useDispatch,
  useSelector,
} from "react-redux"

import {
  useNavigate,
} from "react-router-dom"

import {
  addToCart,
} from "../../../slices/cartSlice"

import {
  ACCOUNT_TYPE,
} from "../../../utils/constants"

function CourseDetailsCard({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) {
  const { user } = useSelector(
    (state) => state.profile
  )

  const { token } = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  // SHARE
  const handleShare = () => {
    copy(window.location.href)

    toast.success(
      "Link copied to clipboard"
    )
  }

  // ADD TO CART
  const handleAddToCart = () => {
    if (
      user &&
      user?.accountType ===
        ACCOUNT_TYPE.INSTRUCTOR
    ) {
      toast.error(
        "You are an Instructor. You can't buy a course."
      )

      return
    }

    if (token) {
      dispatch(addToCart(course))

      toast.success(
        "Added to Cart"
      )

      return
    }

    setConfirmationModal({
      text1:
        "You are not logged in!",
      text2:
        "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () =>
        navigate("/login"),
      btn2Handler: () =>
        setConfirmationModal(
          null
        ),
    })
  }

  return (
    <div
      className="overflow-hidden border shadow-2xl  rounded-3xl border-white/10 bg-richblack-800/80 backdrop-blur-md"
    >
      {/* THUMBNAIL */}
      <div className="relative">
        
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="
            h-[260px] w-full
            object-cover
          "
        />

        {/* OVERLAY */}
        <div
          className="absolute inset-0  bg-gradient-to-t from-black/60 to-transparent"
        />

        {/* PREMIUM BADGE */}
        <div
          className="absolute px-4 py-2 text-xs font-semibold tracking-wide uppercase border rounded-full  left-5 top-5 border-cyan-400/20 bg-cyan-400/10 text-cyan-300 backdrop-blur-md"
        >
          Premium Course
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-7">
        
        {/* PRICE */}
        <div className="mb-6">
          
          <div className="flex items-end gap-3">
            
            <h2
              className="text-4xl font-bold  text-richblack-5"
            >
              ₹{CurrentPrice}
            </h2>

            <span
              className="px-3 py-1 mb-1 text-sm font-medium text-green-300 rounded-full  bg-green-500/10"
            >
              Best Seller
            </span>
          </div>

          <p
            className="mt-3 text-sm  text-richblack-300"
          >
            One-time payment. Lifetime access.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="space-y-4">
          
          {/* BUY */}
          <button
            onClick={
              user &&
              course?.studentsEnrolled.includes(
                user?._id
              )
                ? () =>
                    navigate(
                      "/dashboard/enrolled-courses"
                    )
                : handleBuyCourse
            }
            className="
              w-full rounded-2xl
              bg-gradient-to-r
              from-yellow-50
              to-yellow-100
              px-6 py-4
              text-lg font-bold
              text-richblack-900
              shadow-lg
              transition-all duration-300
              hover:scale-[1.02]
            "
          >
            {user &&
            course?.studentsEnrolled.includes(
              user?._id
            )
              ? "Go To Course"
              : "Buy Now"}
          </button>

          {/* CART */}
          {(!user ||
            !course?.studentsEnrolled.includes(
              user?._id
            )) && (
            <button
              onClick={
                handleAddToCart
              }
              className="w-full px-6 py-4 text-lg font-semibold transition-all duration-300 border  rounded-2xl border-white/10 bg-richblack-700/40 text-richblack-5 hover:bg-richblack-700"
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* GUARANTEE */}
        <div
          className="flex items-center justify-center gap-2 px-4 py-3 mt-6 text-sm text-green-300 border  rounded-2xl border-green-400/10 bg-green-400/5"
        >
          <FiShield />

          30-Day Money-Back Guarantee
        </div>

        {/* COURSE STATS */}
        <div
          className="grid grid-cols-3 gap-3 mt-8 "
        >
          <div
            className="p-4 text-center border  rounded-2xl border-white/10 bg-richblack-700/30"
          >
            <FiClock
              className="mx-auto text-xl  text-cyan-300"
            />

            <p
              className="mt-2 text-xs  text-richblack-300"
            >
              Lifetime
            </p>
          </div>

          <div
            className="p-4 text-center border  rounded-2xl border-white/10 bg-richblack-700/30"
          >
            <FiUsers
              className="mx-auto text-xl text-pink-300 "
            />

            <p
              className="mt-2 text-xs  text-richblack-300"
            >
              Community
            </p>
          </div>

          <div
            className="p-4 text-center border  rounded-2xl border-white/10 bg-richblack-700/30"
          >
            <FiShield
              className="mx-auto text-xl text-yellow-300 "
            />

            <p
              className="mt-2 text-xs  text-richblack-300"
            >
              Certified
            </p>
          </div>
        </div>

        {/* INCLUDES */}
        <div className="mt-10">
          
          <h3
            className="mb-5 text-xl font-bold  text-richblack-5"
          >
            This Course Includes
          </h3>

          <div className="space-y-4">
            {course?.instructions?.map(
              (item, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 border  rounded-xl border-white/5 bg-richblack-700/20"
                  >
                    <BsFillCaretRightFill
                      className="mt-1 text-sm  text-yellow-50"
                    />

                    <p
                      className="text-sm leading-6  text-richblack-100"
                    >
                      {item}
                    </p>
                  </div>
                )
              }
            )}
          </div>
        </div>

        {/* SHARE */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center w-full gap-3 px-5 py-4 mt-8 font-medium transition-all duration-300 border  rounded-2xl border-cyan-400/10 bg-cyan-400/5 text-cyan-300 hover:bg-cyan-400/10"
        >
          <FaShareSquare />

          Share Course
        </button>
      </div>
    </div>
  )
}

export default CourseDetailsCard