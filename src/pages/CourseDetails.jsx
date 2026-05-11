import React, {
  useEffect,
  useState,
} from "react"

import {
  BiInfoCircle,
} from "react-icons/bi"

import {
  HiOutlineGlobeAlt,
} from "react-icons/hi"

import { ReactMarkdown } from "react-markdown/lib/react-markdown"

import {
  useDispatch,
  useSelector,
} from "react-redux"

import {
  useNavigate,
  useParams,
} from "react-router-dom"

import {
  motion,
} from "framer-motion"

import ConfirmationModal from "../components/common/ConfirmationModal"

import Footer from "../components/common/Footer"

import RatingStars from "../components/common/RatingStars"

import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"

import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"

import { formatDate } from "../services/formatDate"

import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"

import { buyCourse } from "../services/operations/studentFeaturesAPI"

import GetAvgRating from "../utils/avgRating"

import Error from "./Error"

function CourseDetails() {
  const { user } = useSelector(
    (state) => state.profile
  )

  const { token } = useSelector(
    (state) => state.auth
  )

  const { loading } = useSelector(
    (state) => state.profile
  )

  const { paymentLoading } = useSelector(
    (state) => state.course
  )

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { courseId } = useParams()

  const [response, setResponse] =
    useState(null)

  const [
    confirmationModal,
    setConfirmationModal,
  ] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res =
          await fetchCourseDetails(
            courseId
          )

        setResponse(res)
      } catch (error) {
        console.log(
          "Could not fetch Course Details"
        )
      }
    })()
  }, [courseId])

  // AVG RATING
  const [avgReviewCount, setAvgReviewCount] =
    useState(0)

  useEffect(() => {
    const count = GetAvgRating(
      response?.data?.courseDetails
        .ratingAndReviews
    )

    setAvgReviewCount(count)
  }, [response])

  // ACCORDION
  const [isActive, setIsActive] =
    useState(Array(0))

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter(
            (e) => e !== id
          )
    )
  }

  // TOTAL LECTURES
  const [
    totalNoOfLectures,
    setTotalNoOfLectures,
  ] = useState(0)

  useEffect(() => {
    let lectures = 0

    response?.data?.courseDetails?.courseContent?.forEach(
      (sec) => {
        lectures +=
          sec.subSection.length || 0
      }
    )

    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div
        className="grid min-h-screen  place-items-center bg-richblack-900"
      >
        <div className="spinner"></div>
      </div>
    )
  }

  if (!response.success) {
    return <Error />
  }

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails

  // BUY COURSE
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(
        token,
        [courseId],
        user,
        navigate,
        dispatch
      )

      return
    }

    setConfirmationModal({
      text1:
        "You are not logged in!",
      text2:
        "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () =>
        navigate("/login"),
      btn2Handler: () =>
        setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    return (
      <div
        className="grid min-h-screen  place-items-center bg-richblack-900"
      >
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      {/* HERO */}
      <div
        className="relative overflow-hidden  bg-gradient-to-b from-richblack-800 via-richblack-900 to-richblack-900"
      >
        {/* GLOW */}
        <div
          className="
            absolute left-1/2 top-0
            h-[400px] w-[400px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/10 blur-3xl
          "
        />

        <div
          className="
            relative mx-auto
            flex w-11/12
            max-w-[1300px]
            flex-col gap-10
            py-14 lg:flex-row
          "
        >
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex-1 space-y-8 "
          >
            {/* BADGE */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full  border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
            >
              Premium Course
            </div>

            {/* TITLE */}
            <div>
              <h1
                className="text-4xl font-bold leading-tight  text-richblack-5 md:text-5xl"
              >
                {courseName}
              </h1>

              <p
                className="max-w-3xl mt-5 text-lg leading-8  text-richblack-200"
              >
                {courseDescription}
              </p>
            </div>

            {/* RATINGS */}
            <div
              className="flex flex-wrap items-center gap-4 "
            >
              <div
                className="flex items-center gap-2 "
              >
                <span
                  className="text-lg font-bold  text-yellow-50"
                >
                  {avgReviewCount}
                </span>

                <RatingStars
                  Review_Count={
                    avgReviewCount
                  }
                  Star_Size={24}
                />

                <span
                  className=" text-richblack-300"
                >
                  (
                  {
                    ratingAndReviews.length
                  }{" "}
                  Reviews)
                </span>
              </div>

              <div
                className="px-4 py-2 text-sm border rounded-full  border-white/10 text-richblack-300"
              >
                {
                  studentsEnrolled.length
                }{" "}
                Students Enrolled
              </div>
            </div>

            {/* META */}
            <div
              className="flex flex-wrap gap-5  text-richblack-300"
            >
              <div
                className="flex items-center gap-2 "
              >
                <BiInfoCircle />

                Created{" "}
                {formatDate(createdAt)}
              </div>

              <div
                className="flex items-center gap-2 "
              >
                <HiOutlineGlobeAlt />

                English
              </div>
            </div>

            {/* INSTRUCTOR */}
            <div
              className="flex items-center gap-4 "
            >
              <img
                src={
                  instructor.image
                    ? instructor.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                }
                alt="Instructor"
                className="object-cover w-16 h-16 border-2 rounded-full  border-white/10"
              />

              <div>
                <p
                  className="text-sm  text-richblack-300"
                >
                  Instructor
                </p>

                <h3
                  className="text-xl font-semibold  text-richblack-5"
                >
                  {
                    instructor.firstName
                  }{" "}
                  {
                    instructor.lastName
                  }
                </h3>
              </div>
            </div>

            {/* MOBILE IMAGE */}
            <div
              className="overflow-hidden border  rounded-3xl border-white/10 lg:hidden"
            >
              <img
                src={thumbnail}
                alt="Course Thumbnail"
                className="object-cover w-full "
              />
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="
              w-full lg:max-w-[420px]
            "
          >
            <div
              className="sticky  top-24"
            >
              <CourseDetailsCard
                course={
                  response?.data
                    ?.courseDetails
                }
                setConfirmationModal={
                  setConfirmationModal
                }
                handleBuyCourse={
                  handleBuyCourse
                }
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* MAIN */}
      <div
        className=" bg-richblack-900 py-14"
      >
        <div
          className="
            mx-auto flex
            w-11/12
            max-w-[1300px]
            flex-col gap-10
            lg:flex-row
          "
        >
          {/* LEFT CONTENT */}
          <div
            className="flex-1 space-y-10 "
          >
            {/* WHAT YOU'LL LEARN */}
            <div
              className="p-8 border  rounded-3xl border-white/10 bg-richblack-800/40"
            >
              <h2
                className="text-3xl font-bold  text-richblack-5"
              >
                What You'll Learn
              </h2>

              <div
                className="mt-6 prose  prose-invert max-w-none text-richblack-100"
              >
                <ReactMarkdown>
                  {whatYouWillLearn}
                </ReactMarkdown>
              </div>
            </div>

            {/* COURSE CONTENT */}
            <div
              className="p-8 border  rounded-3xl border-white/10 bg-richblack-800/40"
            >
              <div
                className="flex flex-col gap-4 "
              >
                <h2
                  className="text-3xl font-bold  text-richblack-5"
                >
                  Course Content
                </h2>

                <div
                  className="flex flex-wrap items-center justify-between gap-4 "
                >
                  <div
                    className="flex flex-wrap gap-4 text-sm  text-richblack-300"
                  >
                    <span>
                      {
                        courseContent.length
                      }{" "}
                      Sections
                    </span>

                    <span>
                      {
                        totalNoOfLectures
                      }{" "}
                      Lectures
                    </span>

                    <span>
                      {
                        response.data
                          ?.totalDuration
                      }
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setIsActive([])
                    }
                    className="px-5 py-2 text-sm font-medium transition-all duration-300 border  rounded-xl border-yellow-50/20 bg-yellow-50/10 text-yellow-50 hover:bg-yellow-50/20"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* ACCORDION */}
              <div className="mt-8">
                {courseContent?.map(
                  (course, index) => (
                    <CourseAccordionBar
                      course={course}
                      key={index}
                      isActive={isActive}
                      handleActive={
                        handleActive
                      }
                    />
                  )
                )}
              </div>
            </div>

            {/* AUTHOR */}
            <div
              className="p-8 border  rounded-3xl border-white/10 bg-richblack-800/40"
            >
              <h2
                className="text-3xl font-bold  text-richblack-5"
              >
                Meet Your Instructor
              </h2>

              <div
                className="flex flex-col gap-6 mt-8  md:flex-row"
              >
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Instructor"
                  className="object-cover border-4 rounded-full  h-28 w-28 border-white/10"
                />

                <div className="flex-1">
                  <h3
                    className="text-2xl font-bold  text-richblack-5"
                  >
                    {
                      instructor.firstName
                    }{" "}
                    {
                      instructor.lastName
                    }
                  </h3>

                  <p
                    className="mt-4 leading-8  text-richblack-200"
                  >
                    {
                      instructor
                        ?.additionalDetails
                        ?.about
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {confirmationModal && (
        <ConfirmationModal
          modalData={
            confirmationModal
          }
        />
      )}
    </>
  )
}

export default CourseDetails