import { motion } from "framer-motion"

import {
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi"

import signupImg from "../assets/Images/signup.webp"

import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <div
      className="relative overflow-hidden  bg-richblack-900"
    >
      {/* GLOW EFFECTS */}
      <div
        className="
          absolute left-0 top-0
          h-[400px] w-[400px]
          rounded-full
          bg-cyan-500/10 blur-[130px]
        "
      />

      <div
        className="
          absolute bottom-0 right-0
          h-[400px] w-[400px]
          rounded-full
          bg-pink-500/10 blur-[130px]
        "
      />

      {/* MAIN */}
      <div
        className="
          relative mx-auto
          flex min-h-[calc(100vh-80px)]
          w-11/12 max-w-[1300px]
          items-center py-16
        "
      >
        <div
          className="grid items-center w-full gap-16  lg:grid-cols-2"
        >
          {/* LEFT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="hidden lg:block"
          >
            {/* BADGE */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-pink-300 border rounded-full  border-pink-400/20 bg-pink-400/10"
            >
              Join The Future of Learning
            </div>

            {/* TITLE */}
            <h1
              className="
                mt-8 text-6xl
                font-bold leading-[1.1]
                text-richblack-5
              "
            >
              Start Your
              <br />

              Learning
              <br />

              Journey With{" "}

              <span
                className="text-transparent  bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text"
              >
                StudySphere
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="max-w-xl mt-8 text-lg leading-8  text-richblack-300"
            >
              Build real-world development skills,
              launch projects, learn from industry
              experts, and grow faster with a
              premium learning experience.
            </p>

            {/* FEATURES */}
            <div className="mt-10 space-y-5">
              
              <div className="flex items-center gap-4">
                <FiCheckCircle className="text-2xl text-cyan-300" />

                <p className="text-richblack-200">
                  Learn by building real projects
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FiCheckCircle className="text-2xl text-pink-300" />

                <p className="text-richblack-200">
                  Premium courses & instructor support
                </p>
              </div>

              <div className="flex items-center gap-4">
                <FiCheckCircle className="text-2xl text-yellow-50" />

                <p className="text-richblack-200">
                  Become industry ready faster
                </p>
              </div>
            </div>

            {/* STATS */}
            <div
              className="flex flex-wrap gap-6 mt-12 "
            >
              <div
                className="px-6 py-5 border  rounded-2xl border-white/10 bg-richblack-800/50 backdrop-blur-md"
              >
                <h3
                  className="text-3xl font-bold  text-cyan-300"
                >
                  50K+
                </h3>

                <p
                  className="mt-1 text-sm  text-richblack-300"
                >
                  Learners
                </p>
              </div>

              <div
                className="px-6 py-5 border  rounded-2xl border-white/10 bg-richblack-800/50 backdrop-blur-md"
              >
                <h3
                  className="text-3xl font-bold text-pink-300 "
                >
                  120+
                </h3>

                <p
                  className="mt-1 text-sm  text-richblack-300"
                >
                  Courses
                </p>
              </div>
            </div>

            {/* CTA */}
            <div
              className="inline-flex items-center gap-3 px-6 py-4 mt-10 font-semibold shadow-xl  rounded-2xl bg-yellow-50 text-richblack-900"
            >
              Create Free Account

              <FiArrowRight className="text-xl" />
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="relative"
          >
            {/* CARD */}
            <div
              className="
                relative overflow-hidden
                rounded-[32px]
                border border-white/10
                bg-richblack-800/70
                p-2 shadow-2xl
                backdrop-blur-xl
              "
            >
              {/* INNER */}
              <div
                className="
                  rounded-[28px]
                  bg-richblack-900/80
                  p-2
                "
              >
                <Template
                  title="Join the millions learning to code with StudySphere"
                  description1="Build skills for today, tomorrow, and beyond."
                  description2="Education to future-proof your career."
                  image={signupImg}
                  formType="signup"
                />
              </div>
            </div>

            {/* FLOATING BLOBS */}
            <div
              className="absolute w-40 h-40 rounded-full  -right-10 -top-10 bg-cyan-400/10 blur-3xl"
            />

            <div
              className="absolute w-40 h-40 rounded-full  -bottom-10 -left-10 bg-pink-400/10 blur-3xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Signup