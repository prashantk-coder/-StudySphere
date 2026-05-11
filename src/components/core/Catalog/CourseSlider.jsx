import React from "react"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import {
  FreeMode,
  Pagination,
  Autoplay,
} from "swiper"

import Course_Card from "./Course_Card"

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={28}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },

            768: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full py-4"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide
              key={i}
              className="h-auto"
            >
              <div className="h-full">
                <Course_Card
                  course={course}
                  Height={"h-[220px]"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">
          No Course Found
        </p>
      )}
    </>
  )
}

export default CourseSlider