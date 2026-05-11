import React, { useState } from "react"

import { motion } from "framer-motion"

import { useForm } from "react-hook-form"

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai"

import { FiShield } from "react-icons/fi"

import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"

import IconBtn from "../../../common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] =
    useState(false)

  const [showNewPassword, setShowNewPassword] =
    useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log(
        "ERROR MESSAGE - ",
        error.message
      )
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(submitPasswordForm)}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-10"
    >
      <div
        className="overflow-hidden border  rounded-3xl border-white/10 bg-richblack-800/70 backdrop-blur-md"
      >
        {/* HEADER */}
        <div
          className="flex items-center gap-4 px-8 py-6 border-b  border-white/10"
        >
          <div
            className="flex items-center justify-center  h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20"
          >
            <FiShield className="text-2xl text-cyan-300" />
          </div>

          <div>
            <h2
              className="text-2xl font-bold  text-richblack-5"
            >
              Security Settings
            </h2>

            <p className="text-sm text-richblack-300">
              Update your password regularly to
              keep your account secure.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="grid gap-6 p-8 lg:grid-cols-2">
          
          {/* CURRENT PASSWORD */}
          <div className="relative flex flex-col gap-2">
            
            <label
              htmlFor="oldPassword"
              className="text-sm font-medium  text-richblack-100"
            >
              Current Password
            </label>

            <input
              type={
                showOldPassword
                  ? "text"
                  : "password"
              }
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter current password"
              className="px-4 py-3 pr-12 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              {...register("oldPassword", {
                required: true,
              })}
            />

            <span
              onClick={() =>
                setShowOldPassword((prev) => !prev)
              }
              className="
                absolute right-4 top-[45px]
                cursor-pointer text-richblack-300
                transition-all duration-300
                hover:text-cyan-300
              "
            >
              {showOldPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>

            {errors.oldPassword && (
              <span className="text-sm text-pink-300">
                Please enter your current password.
              </span>
            )}
          </div>

          {/* NEW PASSWORD */}
          <div className="relative flex flex-col gap-2">
            
            <label
              htmlFor="newPassword"
              className="text-sm font-medium  text-richblack-100"
            >
              New Password
            </label>

            <input
              type={
                showNewPassword
                  ? "text"
                  : "password"
              }
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              className="px-4 py-3 pr-12 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              {...register("newPassword", {
                required: true,
                minLength: {
                  value: 6,
                  message:
                    "Password must be at least 6 characters.",
                },
              })}
            />

            <span
              onClick={() =>
                setShowNewPassword((prev) => !prev)
              }
              className="
                absolute right-4 top-[45px]
                cursor-pointer text-richblack-300
                transition-all duration-300
                hover:text-cyan-300
              "
            >
              {showNewPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>

            {errors.newPassword && (
              <span className="text-sm text-pink-300">
                {errors.newPassword.message ||
                  "Please enter your new password."}
              </span>
            )}
          </div>
        </div>

        {/* PASSWORD TIPS */}
        <div
          className="p-5 mx-8 mb-8 border  rounded-2xl border-cyan-400/10 bg-cyan-400/5"
        >
          <p
            className="mb-2 text-sm font-semibold  text-cyan-300"
          >
            Password Tips
          </p>

          <ul
            className="pl-5 space-y-1 text-sm list-disc  text-richblack-200"
          >
            <li>
              Use at least 8 characters
            </li>

            <li>
              Include uppercase and lowercase
              letters
            </li>

            <li>
              Add numbers and special characters
            </li>

            <li>
              Avoid using personal information
            </li>
          </ul>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div
        className="flex flex-wrap justify-end gap-4 mt-8 "
      >
        <button
          type="button"
          onClick={() =>
            navigate("/dashboard/my-profile")
          }
          className="px-6 py-3 font-semibold transition-all duration-300 border  rounded-2xl border-white/10 bg-richblack-700/50 text-richblack-50 hover:bg-richblack-700"
        >
          Cancel
        </button>

        <IconBtn
          type="submit"
          text="Update Password"
        />
      </div>
    </motion.form>
  )
}