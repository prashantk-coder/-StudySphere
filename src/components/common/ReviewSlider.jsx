import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { FaStar } from "react-icons/fa"

import { Autoplay, FreeMode } from "swiper"

import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const truncateWords = 20

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )

        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (error) {
        console.log("REVIEW SLIDER ERROR:", error)
      }

      setLoading(false)
    })()
  }, [])

  return (
    <section className="relative w-full py-24 overflow-hidden bg-richblack-900">
      
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative w-11/12 mx-auto max-w-maxContent">
        
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold text-richblack-5 md:text-5xl">
            Reviews from other learners
          </h2>

          <p className="mx-auto mt-4 max-w-[650px] text-richblack-300">
            Thousands of learners are building skills, growing careers,
            and achieving their goals with StudySphere.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 rounded-full animate-spin border-richblack-600 border-t-cyan-400"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center text-richblack-300">
            No reviews available right now.
          </div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={28}
            loop={reviews.length > 2}
            freeMode={true}
            speed={1000}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[FreeMode, Autoplay]}
            className="pb-10"
          >
            {reviews.map((review, i) => {
              return (
                <SwiperSlide key={i}>
                  <div
                    className="
                    group flex min-h-[280px] flex-col rounded-2xl
                    border border-richblack-700 bg-richblack-800/80
                    p-6 backdrop-blur-sm transition-all duration-300
                    hover:-translate-y-2
                    hover:border-cyan-400/30
                    hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]
                  "
                  >
                    {/* Top */}
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          review?.user?.image
                            ? review?.user?.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                        }
                        alt="user"
                        className="object-cover transition-all duration-300 rounded-full  h-14 w-14 ring-2 ring-richblack-600 group-hover:ring-cyan-400/40"
                      />

                      <div>
                        <h3 className="text-lg font-semibold text-richblack-5">
                          {review?.user?.firstName}{" "}
                          {review?.user?.lastName}
                        </h3>

                        <p className="text-sm text-richblack-300">
                          {review?.course?.courseName}
                        </p>
                      </div>
                    </div>

                    {/* Review */}
                    <p className="mt-6 leading-7 text-richblack-100">
                      {review?.review?.split(" ").length > truncateWords
                        ? `${review?.review
                            ?.split(" ")
                            ?.slice(0, truncateWords)
                            ?.join(" ")}...`
                        : review?.review}
                    </p>

                    {/* Bottom */}
                    <div className="flex items-center gap-3 pt-8 mt-auto">
                      <span className="text-lg font-bold text-yellow-50">
                        {review?.rating?.toFixed(1)}
                      </span>

                      <ReactStars
                        count={5}
                        value={review?.rating}
                        size={20}
                        edit={false}
                        activeColor="#FFD60A"
                        emptyIcon={<FaStar />}
                        fullIcon={<FaStar />}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
      </div>
    </section>
  )
}

export default ReviewSlider