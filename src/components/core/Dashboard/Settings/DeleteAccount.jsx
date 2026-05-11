import { motion } from "framer-motion"

import { FiAlertTriangle, FiTrash2 } from "react-icons/fi"

import { useDispatch, useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()

  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log(
        "ERROR MESSAGE - ",
        error.message
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden border  rounded-3xl border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-red-500/5 backdrop-blur-md"
    >
      {/* HEADER */}
      <div
        className="flex items-center gap-4 px-8 py-6 border-b  border-pink-500/10"
      >
        <div
          className="flex items-center justify-center  h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-red-500/20"
        >
          <FiAlertTriangle className="text-2xl text-pink-300" />
        </div>

        <div>
          <h2
            className="text-2xl font-bold  text-richblack-5"
          >
            Danger Zone
          </h2>

          <p className="text-sm text-pink-200/80">
            Permanently delete your account and all
            associated data.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="flex flex-col gap-8 px-8 py-8  lg:flex-row lg:items-center lg:justify-between"
      >
        {/* LEFT CONTENT */}
        <div className="max-w-2xl">
          
          <h3
            className="text-xl font-semibold  text-richblack-5"
          >
            Delete Your Account
          </h3>

          <p
            className="mt-3 leading-7  text-richblack-200"
          >
            Once you delete your account, all your
            enrolled courses, profile information,
            instructor content, certificates, and
            learning history will be permanently
            removed.
          </p>

          {/* WARNING LIST */}
          <div
            className="p-5 mt-6 border  rounded-2xl border-pink-500/10 bg-black/20"
          >
            <p
              className="mb-3 font-semibold text-pink-300 "
            >
              This action cannot be undone:
            </p>

            <ul
              className="pl-5 space-y-2 text-sm list-disc  text-richblack-200"
            >
              <li>
                Your profile and settings will be
                deleted
              </li>

              <li>
                All enrolled courses will be removed
              </li>

              <li>
                Instructor content and uploads will
                disappear
              </li>

              <li>
                Certificates and progress history
                will be lost
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex flex-col gap-4
            lg:min-w-[260px]
          "
        >
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="
              group flex items-center
              justify-center gap-3
              rounded-2xl
              bg-gradient-to-r
              from-pink-500
              to-red-500
              px-6 py-4
              font-semibold text-white
              shadow-lg
              transition-all duration-300
              hover:scale-[1.02]
              hover:shadow-pink-500/20
            "
          >
            <FiTrash2
              className="text-lg transition-all duration-300  group-hover:rotate-12"
            />

            Delete My Account
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/my-profile")
            }
            className="px-6 py-4 font-semibold transition-all duration-300 border  rounded-2xl border-white/10 bg-richblack-700/40 text-richblack-100 hover:bg-richblack-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  )
}