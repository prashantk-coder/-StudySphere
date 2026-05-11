import React from "react"
import { Link } from "react-router-dom"

import Logo from "../../assets/Logo/Logo-Full-Light.png"

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-richblack-700 bg-richblack-900">
      
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-pink-500/10 blur-[120px]" />

      <div className="relative w-11/12 py-20 mx-auto max-w-maxContent">
        
        {/* TOP */}
        <div className="grid grid-cols-1 border-b gap-14 border-richblack-700 pb-14 md:grid-cols-2 lg:grid-cols-4">
          
          {/* BRAND */}
          <div>
            <img
              src={Logo}
              alt="StudySphere"
              className="mb-6 w-[180px]"
            />

            <p className="max-w-[260px] leading-7 text-richblack-300">
              StudySphere is a premium learning platform helping students,
              developers, and creators build real-world skills.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-6 text-xl text-richblack-300">
              <a
                href="#"
                className="transition-all duration-300 hover:scale-110 hover:text-cyan-400"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="transition-all duration-300 hover:scale-110 hover:text-cyan-400"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="transition-all duration-300 hover:scale-110 hover:text-cyan-400"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                className="transition-all duration-300 hover:scale-110 hover:text-cyan-400"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="transition-all duration-300 hover:scale-110 hover:text-cyan-400"
              >
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-richblack-5">
              Product
            </h3>

            <div className="flex flex-col gap-3 text-richblack-300">
              <Link
                to="/catalog/web-development"
                className="transition-all duration-200 hover:text-cyan-400"
              >
                Courses
              </Link>

              <Link
                to="/about"
                className="transition-all duration-200 hover:text-cyan-400"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="transition-all duration-200 hover:text-cyan-400"
              >
                Contact
              </Link>

              <Link
                to="/signup"
                className="transition-all duration-200 hover:text-cyan-400"
              >
                Start Learning
              </Link>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-richblack-5">
              Resources
            </h3>

            <div className="flex flex-col gap-3 text-richblack-300">
              <Link
                to="#"
                className="transition-all duration-200 hover:text-cyan-400"
              >
                Documentation
              </Link>

              <Link
                to="#"
                className="transition-all duration-200 hover:text-cyan-400"
              >
                Community
              </Link>

              <Link
                to="#"
                className="transition-all duration-200 hover:text-cyan-400"
              >
                Blog
              </Link>

              <Link
                to="#"
                className="transition-all duration-200 hover:text-cyan-400"
              >
                Help Center
              </Link>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-richblack-5">
              Stay Updated
            </h3>

            <p className="mb-5 text-richblack-300">
              Get the latest courses, updates, and learning resources.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  rounded-xl border border-richblack-700
                  bg-richblack-800 px-4 py-3
                  text-richblack-5 outline-none
                  transition-all duration-300
                  focus:border-cyan-400
                  focus:shadow-[0_0_20px_rgba(34,211,238,0.15)]
                "
              />

              <button
                className="
                  rounded-xl bg-yellow-50 py-3 font-semibold
                  text-richblack-900 transition-all duration-300
                  hover:scale-[1.02]
                  hover:bg-yellow-25
                "
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 mt-8 text-sm text-richblack-400 md:flex-row">
          
          <div className="flex items-center gap-5">
            <Link
              to="#"
              className="transition-all duration-200 hover:text-cyan-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="#"
              className="transition-all duration-200 hover:text-cyan-400"
            >
              Terms
            </Link>

            <Link
              to="#"
              className="transition-all duration-200 hover:text-cyan-400"
            >
              Cookies
            </Link>
          </div>

          <p className="text-center text-richblack-400">
            © 2026 StudySphere. Built with ❤️ by Prashant Chahar
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer