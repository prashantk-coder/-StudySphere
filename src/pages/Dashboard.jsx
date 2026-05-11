import { useSelector } from "react-redux"

import { Outlet } from "react-router-dom"

import { motion } from "framer-motion"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } =
    useSelector((state) => state.profile)

  const { loading: authLoading } =
    useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div
        className="
          grid min-h-[calc(100vh-78px)]
          place-items-center
          bg-richblack-900
        "
      >
        <div
          className="border-4 rounded-full  h-14 w-14 animate-spin border-richblack-700 border-t-cyan-400"
        />
      </div>
    )
  }

  return (
    <div
      className="
        relative flex
        min-h-[calc(100vh-78px)]
        overflow-hidden
        bg-richblack-900
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute left-0 top-0
          h-[350px] w-[350px]
          rounded-full
          bg-cyan-500/10
          blur-[140px]
        "
      />

      <div
        className="
          absolute bottom-0 right-0
          h-[350px] w-[350px]
          rounded-full
          bg-pink-500/10
          blur-[140px]
        "
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="
          relative h-[calc(100vh-78px)]
          flex-1 overflow-y-auto
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="
            mx-auto w-11/12
            max-w-[1200px]
            py-10
          "
        >
          {/* Content Wrapper */}
          <div
            className="
              rounded-3xl
              border border-white/10
              bg-richblack-800/40
              p-6 backdrop-blur-xl
              shadow-[0_10px_50px_rgba(0,0,0,0.25)]
              md:p-8
            "
          >
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard