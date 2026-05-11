import { useEffect, useState } from "react"
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai"

import { BsChevronDown } from "react-icons/bs"

import { useSelector } from "react-redux"

import {
  Link,
  matchPath,
  useLocation,
} from "react-router-dom"

import { NavbarLinks } from "../../data/navbar-links"

import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"

import { ACCOUNT_TYPE } from "../../utils/constants"

import ProfileDropdown from "../core/Auth/ProfileDropDown"

import { motion } from "framer-motion"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)

      try {
        const res = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        )

        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }

      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath(
      { path: route },
      location.pathname
    )
  }

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        sticky top-0 z-50
        border-b border-white/10
        bg-richblack-900/80
        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
      "
    >
      <div
        className="
          mx-auto flex h-[78px]
          w-11/12 max-w-maxContent
          items-center justify-between
        "
      >
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div
            className="grid font-bold text-black transition-all duration-300 shadow-lg h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-400 group-hover:scale-105 group-hover:rotate-3"
          >
            SS
          </div>

          <div className="leading-tight">
            <p
              className="text-xl font-bold text-white transition-all duration-300 group-hover:text-cyan-300"
            >
              StudySphere
            </p>

            <p
              className="
                text-[11px]
                uppercase tracking-[0.22em]
                text-richblack-300
              "
            >
              learn together
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-8">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center group">
                    
                    <div
                      className={`
                        flex cursor-pointer items-center gap-1
                        font-medium transition-all duration-300
                        ${
                          matchRoute("/catalog/:catalogName")
                            ? "text-yellow-50"
                            : "text-richblack-25 hover:text-cyan-300"
                        }
                      `}
                    >
                      <p>{link.title}</p>

                      <BsChevronDown
                        className="text-sm transition-all duration-300 group-hover:rotate-180"
                      />
                    </div>

                    {/* DROPDOWN */}
                    <div
                      className="
                        invisible absolute left-1/2 top-[140%]
                        z-[1000] w-[270px]
                        -translate-x-1/2
                        rounded-2xl border border-white/10
                        bg-richblack-800/95
                        p-4 opacity-0
                        backdrop-blur-xl
                        shadow-2xl
                        transition-all duration-300
                        group-hover:visible
                        group-hover:translate-y-1
                        group-hover:opacity-100
                      "
                    >
                      <div className="flex flex-col gap-1">
                        {loading ? (
                          <p className="py-4 text-center text-richblack-200">
                            Loading...
                          </p>
                        ) : subLinks &&
                          subLinks.length ? (
                          subLinks
                            ?.filter(
                              (subLink) =>
                                subLink?.courses?.length > 0
                            )
                            ?.map((subLink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="px-4 py-3 transition-all duration-200 rounded-xl text-richblack-25 hover:bg-richblack-700 hover:text-cyan-300"
                              >
                                {subLink.name}
                              </Link>
                            ))
                        ) : (
                          <p className="py-4 text-center text-richblack-200">
                            No Courses Found
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`
                        relative font-medium transition-all duration-300
                        ${
                          matchRoute(link?.path)
                            ? "text-yellow-50"
                            : "text-richblack-25 hover:text-cyan-300"
                        }
                      `}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT SIDE */}
        <div className="items-center hidden gap-x-4 md:flex">
          
          {user &&
            user?.accountType !==
              ACCOUNT_TYPE.INSTRUCTOR && (
              <Link
                to="/dashboard/cart"
                className="relative p-2 transition-all duration-300 rounded-full hover:bg-richblack-800"
              >
                <AiOutlineShoppingCart
                  className="text-2xl transition-all duration-300 text-richblack-100 hover:text-cyan-300"
                />

                {totalItems > 0 && (
                  <span
                    className="absolute grid w-5 h-5 text-xs font-bold text-black rounded-full shadow-lg -right-1 -top-1 place-items-center bg-yellow-50"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

          {token === null && (
            <Link to="/login">
              <button
                className="
                  rounded-full border border-white/10
                  bg-richblack-800 px-5 py-2.5
                  font-medium text-richblack-5
                  transition-all duration-300
                  hover:border-cyan-400
                  hover:bg-richblack-700
                  hover:text-cyan-300
                "
              >
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button
                className="
                  rounded-full bg-yellow-50
                  px-5 py-2.5
                  font-semibold text-black
                  transition-all duration-300
                  hover:scale-95
                  hover:bg-yellow-25
                "
              >
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* MOBILE MENU */}
        <button
          className="p-2 transition-all rounded-lg hover:bg-richblack-800 md:hidden"
        >
          <AiOutlineMenu
            fontSize={24}
            fill="#E2E8F0"
          />
        </button>
      </div>
    </motion.div>
  )
}

export default Navbar