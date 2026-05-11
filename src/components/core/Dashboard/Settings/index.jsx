import { motion } from "framer-motion"

import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="text-white">
      
      {/* PAGE HEADER */}
      <div className="mb-10">
        
        <p
          className="
            text-sm uppercase
            tracking-[0.22em]
            text-cyan-400
          "
        >
          Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Account Settings
        </h1>

        <p className="max-w-2xl mt-3 text-richblack-300">
          Manage your profile information, update security settings,
          and customize your StudySphere experience.
        </p>
      </div>

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-8"
      >
        {/* PROFILE PHOTO */}
        <div
          className="p-6 border  rounded-3xl border-white/10 bg-richblack-800/60 backdrop-blur-xl"
        >
          <ChangeProfilePicture />
        </div>

        {/* PROFILE DETAILS */}
        <div
          className="p-6 border  rounded-3xl border-white/10 bg-richblack-800/60 backdrop-blur-xl"
        >
          <EditProfile />
        </div>

        {/* PASSWORD */}
        <div
          className="p-6 border  rounded-3xl border-white/10 bg-richblack-800/60 backdrop-blur-xl"
        >
          <UpdatePassword />
        </div>

        {/* DELETE ACCOUNT */}
        <div
          className="p-6 border  rounded-3xl border-pink-500/20 bg-pink-500/5 backdrop-blur-xl"
        >
          <DeleteAccount />
        </div>
      </motion.div>
    </div>
  )
}