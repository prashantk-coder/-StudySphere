import { RiEditBoxLine } from "react-icons/ri"

import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"

import { motion } from "framer-motion"

import { formattedDate } from "../../../utils/dateFormatter"

import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector(
    (state) => state.profile
  )

  const navigate = useNavigate()

  return (
    <div className="text-white">
      
      {/* HEADING */}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
          Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          My Profile
        </h1>
      </div>

      {/* PROFILE HERO */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="
          relative overflow-hidden rounded-3xl
          border border-white/10
          bg-richblack-800/60
          p-8 backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        "
      >
        {/* Glow */}
        <div
          className="
            absolute right-0 top-0
            h-[180px] w-[180px]
            rounded-full bg-cyan-400/10
            blur-[100px]
          "
        />

        <div
          className="relative flex flex-col gap-6  md:flex-row md:items-center md:justify-between"
        >
          {/* LEFT */}
          <div className="flex items-center gap-5">
            
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="object-cover w-24 h-24 border-4 rounded-full shadow-xl  border-white/10"
            />

            <div>
              <h2 className="text-3xl font-bold text-white">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="mt-2 text-richblack-300">
                {user?.email}
              </p>

              <div
                className="inline-flex items-center px-4 py-1 mt-4 text-sm font-medium rounded-full  bg-cyan-400/10 text-cyan-300"
              >
                {user?.accountType}
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <IconBtn
            text="Edit Profile"
            onclick={() =>
              navigate("/dashboard/settings")
            }
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </motion.div>

      {/* ABOUT */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="p-8 mt-8 border  rounded-3xl border-white/10 bg-richblack-800/60 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-6">
          
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-400">
              About
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Personal Bio
            </h2>
          </div>

          <IconBtn
            text="Edit"
            onclick={() =>
              navigate("/dashboard/settings")
            }
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <p
          className={`
            max-w-3xl leading-8
            ${
              user?.additionalDetails?.about
                ? "text-richblack-100"
                : "text-richblack-400"
            }
          `}
        >
          {user?.additionalDetails?.about ??
            "Tell learners and instructors something about yourself. Your profile helps build trust and community."}
        </p>
      </motion.div>

      {/* DETAILS */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="p-8 mt-8 border  rounded-3xl border-white/10 bg-richblack-800/60 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-8">
          
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-400">
              Information
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Personal Details
            </h2>
          </div>

          <IconBtn
            text="Edit"
            onclick={() =>
              navigate("/dashboard/settings")
            }
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          
          {/* LEFT */}
          <div className="space-y-6">
            
            <div>
              <p className="text-sm text-richblack-400">
                First Name
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {user?.firstName}
              </p>
            </div>

            <div>
              <p className="text-sm text-richblack-400">
                Email Address
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-richblack-400">
                Gender
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {user?.additionalDetails?.gender ??
                  "Not Added"}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            
            <div>
              <p className="text-sm text-richblack-400">
                Last Name
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {user?.lastName}
              </p>
            </div>

            <div>
              <p className="text-sm text-richblack-400">
                Phone Number
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {user?.additionalDetails
                  ?.contactNumber ??
                  "Not Added"}
              </p>
            </div>

            <div>
              <p className="text-sm text-richblack-400">
                Date of Birth
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {formattedDate(
                  user?.additionalDetails
                    ?.dateOfBirth
                ) ?? "Not Added"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}