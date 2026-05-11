import { motion } from "framer-motion"

import {
  FiArrowRight,
} from "react-icons/fi"

import loginImg from "../assets/Images/login.webp"

import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <div
      className="relative overflow-hidden  bg-richblack-900"
    >
      {/* BACKGROUND GLOWS */}
      <div
        className="
          absolute left-0 top-0
          h-[350px] w-[350px]
          rounded-full
          bg-cyan-500/10 blur-[120px]
        "
      />

      <div
        className="
          absolute bottom-0 right-0
          h-[350px] w-[350px]
          rounded-full
          bg-pink-500/10 blur-[120px]
        "
      />

      {/* GRID */}
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
            className="hidden  lg:block"
          >
            {/* BADGE */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium border rounded-full  border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
            >
              Learn • Build • Grow
            </div>

            {/* TITLE */}
            <h1
              className="
                mt-8 text-6xl
                font-bold leading-[1.1]
                text-richblack-5
              "
            >
              Level Up
              <br />

              Your Skills
              <br />

              With{" "}

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
              Join thousands of learners building
              real-world development skills through
              premium courses, projects, and
              hands-on learning experiences.
            </p>

            {/* STATS */}
            <div
              className="flex flex-wrap gap-6 mt-10 "
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
                  Active Students
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
                  Premium Courses
                </p>
              </div>
            </div>

            {/* CTA */}
            <div
              className="inline-flex items-center gap-3 px-6 py-4 mt-10 font-semibold shadow-xl  rounded-2xl bg-yellow-50 text-richblack-900"
            >
              Start Learning Today

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
            className="relative "
          >
            {/* CARD WRAPPER */}
            <div
              className="
                relative overflow-hidden
                rounded-[32px]
                border border-white/10
                bg-richblack-800/70
                p-2
                shadow-2xl
                backdrop-blur-xl
              "
            >
              {/* INNER CARD */}
              <div
                className="
                  rounded-[28px]
                  bg-richblack-900/80
                  p-2
                "
              >
                <Template
                  title="Welcome Back"
                  description1="Build skills for today, tomorrow, and beyond."
                  description2="Education to future-proof your career."
                  image={loginImg}
                  formType="login"
                />
              </div>
            </div>

            {/* FLOATING GLOW */}
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

export default Login