import { useEffect, useRef, useState } from "react"

import { FiUpload } from "react-icons/fi"

import { useDispatch, useSelector } from "react-redux"

import { motion } from "framer-motion"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"

import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)

  const { user } = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const [imageFile, setImageFile] = useState(null)

  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = async () => {
    try {
      setLoading(true)

      const formData = new FormData()

      formData.append("displayPicture", imageFile)

      await dispatch(
        updateDisplayPicture(token, formData)
      )

      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="text-white"
    >
      {/* HEADER */}
      <div className="mb-6">
        
        <p
          className="
            text-sm uppercase
            tracking-[0.18em]
            text-cyan-400
          "
        >
          Profile
        </p>

        <h2 className="mt-1 text-2xl font-bold">
          Profile Picture
        </h2>

        <p className="mt-2 text-richblack-300">
          Upload a professional profile image that represents you.
        </p>
      </div>

      {/* CONTENT */}
      <div
        className="flex flex-col gap-8  md:flex-row md:items-center md:justify-between"
      >
        {/* LEFT */}
        <div className="flex items-center gap-5">
          
          {/* IMAGE */}
          <div className="relative">
            
            <div
              className="absolute inset-0 rounded-full  bg-cyan-400/20 blur-xl"
            />

            <img
              src={previewSource || user?.image}
              alt={`profile-${user?.firstName}`}
              className="relative object-cover border-4 rounded-full shadow-2xl  h-28 w-28 border-white/10"
            />
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h3>

            <p className="mt-1 text-richblack-300">
              JPG, PNG or GIF • Max size 5MB
            </p>

            <div
              className="inline-flex items-center px-4 py-1 mt-3 text-sm font-medium rounded-full  bg-cyan-400/10 text-cyan-300"
            >
              {user?.accountType}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4">
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/gif, image/jpeg"
          />

          <button
            onClick={handleClick}
            disabled={loading}
            className="
              rounded-xl border border-white/10
              bg-richblack-700/60
              px-6 py-3 font-semibold
              text-richblack-50
              transition-all duration-300
              hover:bg-richblack-700
              hover:scale-[1.02]
            "
          >
            Select Image
          </button>

          <IconBtn
            text={loading ? "Uploading..." : "Upload"}
            onclick={handleFileUpload}
          >
            {!loading && (
              <FiUpload className="text-lg text-richblack-900" />
            )}
          </IconBtn>
        </div>
      </div>
    </motion.div>
  )
}