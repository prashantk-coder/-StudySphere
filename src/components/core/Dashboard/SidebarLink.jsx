import * as Icons from "react-icons/vsc"

import { useDispatch } from "react-redux"

import {
  NavLink,
  matchPath,
  useLocation,
} from "react-router-dom"

import { motion } from "framer-motion"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({
  link,
  iconName,
}) {
  const Icon = Icons[iconName]

  const location = useLocation()

  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath(
      { path: route },
      location.pathname
    )
  }

  const isActive = matchRoute(link.path)

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className="relative"
    >
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
        className={`
          group relative flex items-center gap-3
          overflow-hidden rounded-xl
          px-4 py-3 text-sm font-medium
          transition-all duration-300
          
          ${
            isActive
              ? `
                border border-cyan-400/20
                bg-gradient-to-r
                from-cyan-400/10
                to-blue-500/10
                text-cyan-300
                shadow-[0_0_25px_rgba(34,211,238,0.08)]
              `
              : `
                text-richblack-300
                hover:bg-richblack-800
                hover:text-white
              `
          }
        `}
      >
        {/* Active Indicator */}
        {isActive && (
          <div
            className="absolute top-0 left-0 w-1 h-full rounded-r-full  bg-cyan-400"
          />
        )}

        {/* Glow */}
        {isActive && (
          <div
            className="absolute inset-0  bg-cyan-400/5 blur-xl"
          />
        )}

        {/* ICON */}
        <div
          className={`
            relative z-10 flex items-center justify-center
            text-lg transition-all duration-300

            ${
              isActive
                ? "text-cyan-300"
                : "text-richblack-400 group-hover:text-cyan-300"
            }
          `}
        >
          <Icon />
        </div>

        {/* TEXT */}
        <span className="relative z-10">
          {link.name}
        </span>
      </motion.div>
    </NavLink>
  )
}