import React, { useEffect, useState } from "react"
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"
import { Link } from "react-router-dom"

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`} className="block h-full">
      <div
        className="
          group flex h-full flex-col overflow-hidden
          rounded-3xl border border-white/10
          bg-richblack-800/50
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-2
          hover:border-cyan-400/40
          hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)]
        "
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`
              ${Height || "h-[220px]"}
              w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            `}
          />

          <div
            className="absolute px-4 py-1 text-xs font-bold text-black bg-yellow-400 rounded-full  left-4 top-4"
          >
            Bestseller
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-5">
          <h3
            className="mb-2 text-2xl font-bold leading-snug  text-richblack-5"
          >
            {course?.courseName}
          </h3>

          <p className="mb-4 text-sm text-richblack-300">
            by{" "}
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          {/* RATINGS */}
          <div className="flex items-center gap-2 mb-5">
            <span className="font-bold text-yellow-50">
              {avgReviewCount || 0}
            </span>

            <RatingStars Review_Count={avgReviewCount} />

            <span className="text-sm text-richblack-400">
              ({course?.ratingAndReviews?.length})
            </span>
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 text-xs rounded-full bg-richblack-700 text-richblack-200">
              ⏱ 12h+
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-richblack-700 text-richblack-200">
              📶 Intermediate
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-richblack-700 text-richblack-200">
              👨‍🎓 1.2k+
            </span>
          </div>

          {/* PRICE */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-xs tracking-widest uppercase text-richblack-400">
                Price
              </p>

              <p className="text-3xl font-extrabold text-yellow-50">
                ₹ {course?.price}
              </p>
            </div>

            <button
              className="px-5 py-2 text-sm font-semibold text-white transition-all duration-300  rounded-xl bg-cyan-500 hover:bg-cyan-400"
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card