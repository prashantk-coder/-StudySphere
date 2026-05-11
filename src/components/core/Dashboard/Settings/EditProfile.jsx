import { motion } from "framer-motion"

import { useForm } from "react-hook-form"

import { useDispatch, useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/SettingsAPI"

import IconBtn from "../../../common/IconBtn"

const genders = [
  "Male",
  "Female",
  "Non-Binary",
  "Prefer not to say",
  "Other",
]

export default function EditProfile() {
  const { user } = useSelector(
    (state) => state.profile
  )

  const { token } = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log(
        "ERROR MESSAGE - ",
        error.message
      )
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(submitProfileForm)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="text-white"
    >
      {/* HEADER */}
      <div className="mb-8">
        
        <p
          className="
            text-sm uppercase
            tracking-[0.18em]
            text-cyan-400
          "
        >
          Profile Settings
        </p>

        <h2 className="mt-1 text-3xl font-bold">
          Edit Profile
        </h2>

        <p className="mt-2 text-richblack-300">
          Keep your personal details updated so your
          learning experience stays personalized.
        </p>
      </div>

      {/* FORM GRID */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* FIRST NAME */}
        <div className="flex flex-col gap-2">
          
          <label
            htmlFor="firstName"
            className="text-sm font-medium  text-richblack-100"
          >
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            className="px-4 py-3 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            {...register("firstName", {
              required: true,
            })}
            defaultValue={user?.firstName}
          />

          {errors.firstName && (
            <span className="text-sm text-pink-300">
              Please enter your first name.
            </span>
          )}
        </div>

        {/* LAST NAME */}
        <div className="flex flex-col gap-2">
          
          <label
            htmlFor="lastName"
            className="text-sm font-medium  text-richblack-100"
          >
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            className="px-4 py-3 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            {...register("lastName", {
              required: true,
            })}
            defaultValue={user?.lastName}
          />

          {errors.lastName && (
            <span className="text-sm text-pink-300">
              Please enter your last name.
            </span>
          )}
        </div>

        {/* DATE OF BIRTH */}
        <div className="flex flex-col gap-2">
          
          <label
            htmlFor="dateOfBirth"
            className="text-sm font-medium  text-richblack-100"
          >
            Date of Birth
          </label>

          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className="px-4 py-3 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            {...register("dateOfBirth", {
              required: {
                value: true,
                message:
                  "Please enter your Date of Birth.",
              },
              max: {
                value:
                  new Date()
                    .toISOString()
                    .split("T")[0],
                message:
                  "Date of Birth cannot be in the future.",
              },
            })}
            defaultValue={
              user?.additionalDetails?.dateOfBirth
            }
          />

          {errors.dateOfBirth && (
            <span className="text-sm text-pink-300">
              {errors.dateOfBirth.message}
            </span>
          )}
        </div>

        {/* GENDER */}
        <div className="flex flex-col gap-2">
          
          <label
            htmlFor="gender"
            className="text-sm font-medium  text-richblack-100"
          >
            Gender
          </label>

          <select
            name="gender"
            id="gender"
            className="px-4 py-3 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            {...register("gender", {
              required: true,
            })}
            defaultValue={
              user?.additionalDetails?.gender
            }
          >
            {genders.map((ele, i) => (
              <option
                key={i}
                value={ele}
                className="bg-richblack-800"
              >
                {ele}
              </option>
            ))}
          </select>

          {errors.gender && (
            <span className="text-sm text-pink-300">
              Please select your gender.
            </span>
          )}
        </div>

        {/* CONTACT */}
        <div className="flex flex-col gap-2">
          
          <label
            htmlFor="contactNumber"
            className="text-sm font-medium  text-richblack-100"
          >
            Contact Number
          </label>

          <input
            type="tel"
            name="contactNumber"
            id="contactNumber"
            placeholder="Enter contact number"
            className="px-4 py-3 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            {...register("contactNumber", {
              required: {
                value: true,
                message:
                  "Please enter your Contact Number.",
              },
              maxLength: {
                value: 12,
                message: "Invalid Contact Number",
              },
              minLength: {
                value: 10,
                message: "Invalid Contact Number",
              },
            })}
            defaultValue={
              user?.additionalDetails
                ?.contactNumber
            }
          />

          {errors.contactNumber && (
            <span className="text-sm text-pink-300">
              {errors.contactNumber.message}
            </span>
          )}
        </div>

        {/* ABOUT */}
        <div className="flex flex-col gap-2">
          
          <label
            htmlFor="about"
            className="text-sm font-medium  text-richblack-100"
          >
            About
          </label>

          <textarea
            name="about"
            id="about"
            rows={4}
            placeholder="Tell something about yourself..."
            className="px-4 py-3 text-white transition-all duration-300 border outline-none resize-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            {...register("about", {
              required: true,
            })}
            defaultValue={
              user?.additionalDetails?.about
            }
          />

          {errors.about && (
            <span className="text-sm text-pink-300">
              Please enter your bio.
            </span>
          )}
        </div>
      </div>

      {/* BUTTONS */}
      <div
        className="flex flex-wrap justify-end gap-4 mt-10 "
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-6 py-3 font-semibold transition-all duration-300 border  rounded-2xl border-white/10 bg-richblack-700/50 text-richblack-50 hover:bg-richblack-700"
        >
          Cancel
        </button>

        <IconBtn
          type="submit"
          text="Save Changes"
        />
      </div>
    </motion.form>
  )
}