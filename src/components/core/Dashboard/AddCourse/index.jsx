import { motion } from "framer-motion"

import {
  FiBookOpen,
  FiCheckCircle,
  FiVideo,
  FiZap,
} from "react-icons/fi"

import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <div className="flex flex-col gap-8 xl:flex-row">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col flex-1">
          
          {/* PAGE HEADER */}
          <div className="mb-10">
            
            <div
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium border rounded-full  border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
            >
              <FiZap />
              Instructor Studio
            </div>

            <h1
              className="text-4xl font-bold  text-richblack-5"
            >
              Create a New Course
            </h1>

            <p
              className="max-w-2xl mt-3  text-richblack-300"
            >
              Build a premium learning experience
              with lessons, quizzes, sections,
              thumbnails, pricing, and publishing
              tools — all in one place.
            </p>
          </div>

          {/* MAIN CONTENT */}
          <div
            className="p-6 border  rounded-3xl border-white/10 bg-richblack-800/60 backdrop-blur-md"
          >
            <RenderSteps />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            sticky top-24 hidden
            h-fit w-full max-w-[380px]
            xl:block
          "
        >
          <div
            className="overflow-hidden border  rounded-3xl border-white/10 bg-richblack-800/70 backdrop-blur-md"
          >
            {/* HEADER */}
            <div
              className="px-6 py-5 border-b  border-white/10"
            >
              <h2
                className="flex items-center gap-2 text-xl font-bold  text-richblack-5"
              >
                <FiBookOpen className="text-cyan-300" />
                Course Creation Tips
              </h2>

              <p className="mt-2 text-sm text-richblack-300">
                Follow these recommendations to
                create a high-quality course.
              </p>
            </div>

            {/* TIPS */}
            <div className="p-6 space-y-5">
              
              <div className="flex gap-4">
                <div
                  className="flex items-center justify-center w-8 h-8 mt-1  rounded-xl bg-cyan-400/10"
                >
                  <FiVideo className="text-cyan-300" />
                </div>

                <div>
                  <h3
                    className="font-semibold  text-richblack-5"
                  >
                    High Quality Thumbnail
                  </h3>

                  <p
                    className="mt-1 text-sm leading-6  text-richblack-300"
                  >
                    Use 1024×576 thumbnails with
                    clean visuals and readable text.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex items-center justify-center w-8 h-8 mt-1  rounded-xl bg-pink-400/10"
                >
                  <FiCheckCircle className="text-pink-300" />
                </div>

                <div>
                  <h3
                    className="font-semibold  text-richblack-5"
                  >
                    Organize Content
                  </h3>

                  <p
                    className="mt-1 text-sm leading-6  text-richblack-300"
                  >
                    Divide your course into sections,
                    lectures, quizzes, and assignments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex items-center justify-center w-8 h-8 mt-1  rounded-xl bg-yellow-400/10"
                >
                  <FiZap className="text-yellow-300" />
                </div>

                <div>
                  <h3
                    className="font-semibold  text-richblack-5"
                  >
                    Increase Engagement
                  </h3>

                  <p
                    className="mt-1 text-sm leading-6  text-richblack-300"
                  >
                    Add quizzes, downloadable
                    resources, and practical projects.
                  </p>
                </div>
              </div>

              {/* STATS */}
              <div
                className="grid grid-cols-2 gap-4 mt-6 "
              >
                <div
                  className="p-4 border  rounded-2xl border-white/10 bg-richblack-700/30"
                >
                  <p className="text-sm text-richblack-300">
                    Avg Completion
                  </p>

                  <h3
                    className="mt-1 text-2xl font-bold  text-cyan-300"
                  >
                    87%
                  </h3>
                </div>

                <div
                  className="p-4 border  rounded-2xl border-white/10 bg-richblack-700/30"
                >
                  <p className="text-sm text-richblack-300">
                    Active Instructors
                  </p>

                  <h3
                    className="mt-1 text-2xl font-bold text-pink-300 "
                  >
                    12K+
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}