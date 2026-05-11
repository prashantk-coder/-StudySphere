import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  FiBook,
  FiUsers,
  FiDollarSign,
  FiPlusCircle,
} from "react-icons/fi"

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../../services/operations/profileAPI"

import InstructorChart from "./InstructorChart"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(true)
  const [instructorData, setInstructorData] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const instructorApiData = await getInstructorData(token)
        const result = await fetchInstructorCourses(token)

        if (Array.isArray(instructorApiData)) {
          setInstructorData(instructorApiData)
        }

        if (Array.isArray(result)) {
          setCourses(result)
        }
      } catch (error) {
        console.log("DASHBOARD ERROR:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  const totalAmount =
    instructorData?.reduce(
      (acc, curr) => acc + curr.totalAmountGenerated,
      0
    ) || 0

  const totalStudents =
    instructorData?.reduce(
      (acc, curr) => acc + curr.totalStudentsEnrolled,
      0
    ) || 0

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="border-4 rounded-full h-14 w-14 animate-spin border-richblack-700 border-t-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-richblack-300">
            Instructor Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold text-richblack-5">
            Welcome back,{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text">
              {user?.firstName}
            </span>
          </h1>

          <p className="mt-2 text-richblack-300">
            Track your courses, students, and revenue.
          </p>
        </div>

        <Link
          to="/dashboard/add-course"
          className="flex items-center gap-2 px-5 py-3 font-semibold transition-all duration-300 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-300 text-richblack-900 hover:scale-105"
        >
          <FiPlusCircle />
          Create Course
        </Link>
      </div>

      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="p-6 border rounded-2xl border-white/10 bg-richblack-800/60 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-300">
                Total Courses
              </p>

              <h2 className="mt-2 text-4xl font-bold text-richblack-5">
                {courses.length}
              </h2>
            </div>

            <div className="p-4 rounded-full bg-cyan-500/20 text-cyan-300">
              <FiBook size={28} />
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-2xl border-white/10 bg-richblack-800/60 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-300">
                Total Students
              </p>

              <h2 className="mt-2 text-4xl font-bold text-richblack-5">
                {totalStudents}
              </h2>
            </div>

            <div className="p-4 text-pink-300 rounded-full bg-pink-500/20">
              <FiUsers size={28} />
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-2xl border-white/10 bg-richblack-800/60 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-300">
                Total Revenue
              </p>

              <h2 className="mt-2 text-4xl font-bold text-richblack-5">
                ₹ {totalAmount}
              </h2>
            </div>

            <div className="p-4 text-yellow-300 rounded-full bg-yellow-500/20">
              <FiDollarSign size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="p-6 border rounded-2xl border-white/10 bg-richblack-800/50 backdrop-blur-md">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold text-richblack-5">
              Analytics Overview
            </h2>

            <p className="mt-1 text-sm text-richblack-300">
              Revenue & student insights
            </p>
          </div>
        </div>

        {totalAmount > 0 || totalStudents > 0 ? (
          <InstructorChart courses={instructorData} />
        ) : (
          <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-richblack-700">
            <p className="text-lg text-richblack-400">
              Not enough data to visualize analytics
            </p>
          </div>
        )}
      </div>

      {/* COURSES */}
      <div className="p-6 border rounded-2xl border-white/10 bg-richblack-800/50 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-richblack-5">
              Your Courses
            </h2>

            <p className="mt-1 text-sm text-richblack-300">
              Recently created courses
            </p>
          </div>

          <Link
            to="/dashboard/my-courses"
            className="text-sm font-semibold text-yellow-50 hover:text-yellow-25"
          >
            View All
          </Link>
        </div>

        {courses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-richblack-900/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,255,255,0.12)]"
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-[220px] w-full object-cover"
                />

                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold line-clamp-2 text-richblack-5">
                    {course.courseName}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-richblack-300">
                    <p>
                      👨‍🎓 {course.studentsEnroled?.length || 0} students
                    </p>

                    <p className="font-semibold text-yellow-50">
                      ₹ {course.price}
                    </p>
                  </div>

                  <Link
                    to={`/dashboard/edit-course/${course._id}`}
                    className="block py-3 font-medium text-center transition-all duration-300 rounded-xl bg-richblack-700 text-richblack-5 hover:bg-richblack-600"
                  >
                    Manage Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed rounded-2xl border-richblack-700">
            <h2 className="text-3xl font-bold text-richblack-5">
              No Courses Yet
            </h2>

            <p className="mt-3 text-richblack-300">
              Start building your first premium course today.
            </p>

            <Link
              to="/dashboard/add-course"
              className="px-6 py-3 mt-6 font-semibold transition-all duration-300 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-300 text-richblack-900 hover:scale-105"
            >
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}