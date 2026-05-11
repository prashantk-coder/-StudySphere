import { useEffect, useRef, useState } from "react"

import { useDropzone } from "react-dropzone"

import {
  FiImage,
  FiUploadCloud,
  FiVideo,
  FiX,
} from "react-icons/fi"

import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"

import { Player } from "video-react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector(
    (state) => state.course
  )

  const [selectedFile, setSelectedFile] =
    useState(null)

  const [previewSource, setPreviewSource] =
    useState(
      viewData
        ? viewData
        : editData
        ? editData
        : ""
    )

  const inputRef = useRef(null)

  // DROP
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]

    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: !video
      ? {
          "image/*": [
            ".jpeg",
            ".jpg",
            ".png",
          ],
        }
      : {
          "video/*": [".mp4"],
        },

    onDrop,
  })

  // PREVIEW
  const previewFile = (file) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, {
      required: true,
    })
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue])

  return (
    <div className="space-y-3">
      
      {/* LABEL */}
      <label
        className="text-sm font-medium  text-richblack-100"
        htmlFor={name}
      >
        {label}

        {!viewData && (
          <sup className="text-pink-300">
            *
          </sup>
        )}
      </label>

      {/* CONTAINER */}
      <div
        className={`
          overflow-hidden rounded-3xl
          border transition-all duration-300

          ${
            isDragActive
              ? `
                border-cyan-400/40
                bg-cyan-400/5
                shadow-lg shadow-cyan-500/10
              `
              : `
                border-white/10
                bg-richblack-800/50
              `
          }
        `}
      >
        {previewSource ? (
          <div className="p-6">
            
            {/* IMAGE PREVIEW */}
            {!video ? (
              <div className="relative">
                
                <img
                  src={previewSource}
                  alt="Preview"
                  className="
                    max-h-[420px]
                    w-full rounded-2xl
                    object-cover
                  "
                />

                {!viewData && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewSource("")
                      setSelectedFile(null)
                      setValue(name, null)
                    }}
                    className="absolute flex items-center justify-center transition-all duration-300 rounded-full  right-4 top-4 h-11 w-11 bg-black/60 backdrop-blur-md hover:scale-105"
                  >
                    <FiX className="text-xl text-white" />
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* VIDEO PLAYER */}
                <div
                  className="overflow-hidden border  rounded-2xl border-white/10"
                >
                  <Player
                    aspectRatio="16:9"
                    playsInline
                    src={previewSource}
                  />
                </div>

                {!viewData && (
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewSource("")
                      setSelectedFile(null)
                      setValue(name, null)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 font-medium text-red-300 transition-all duration-300 border  rounded-xl border-red-400/20 bg-red-400/10 hover:bg-red-400/20"
                  >
                    <FiX />
                    Remove Video
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="
              flex min-h-[320px]
              cursor-pointer flex-col
              items-center justify-center
              px-8 py-12 text-center
              transition-all duration-300
            "
          >
            <input
              {...getInputProps()}
              ref={inputRef}
            />

            {/* ICON */}
            <div
              className={`
                flex h-20 w-20
                items-center justify-center
                rounded-3xl
                transition-all duration-300

                ${
                  isDragActive
                    ? `
                      scale-110
                      bg-cyan-400/20
                    `
                    : `
                      bg-richblack-700
                    `
                }
              `}
            >
              {video ? (
                <FiVideo
                  className="text-4xl  text-cyan-300"
                />
              ) : (
                <FiImage
                  className="text-4xl  text-yellow-50"
                />
              )}
            </div>

            {/* TEXT */}
            <h3
              className="mt-6 text-2xl font-semibold  text-richblack-5"
            >
              {video
                ? "Upload Lecture Video"
                : "Upload Course Thumbnail"}
            </h3>

            <p
              className="max-w-lg mt-3 leading-7  text-richblack-300"
            >
              Drag and drop your{" "}
              {video ? "video" : "image"}{" "}
              here, or click to browse files
              from your device.
            </p>

            {/* BROWSE BUTTON */}
            <div
              className="
                mt-6 inline-flex
                items-center gap-3
                rounded-2xl
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                px-6 py-3
                font-semibold text-white
                shadow-lg
                transition-all duration-300
                hover:scale-[1.03]
              "
            >
              <FiUploadCloud className="text-xl" />
              Browse Files
            </div>

            {/* INFO */}
            <div
              className="grid gap-4 mt-10 text-sm  text-richblack-300 sm:grid-cols-2"
            >
              <div
                className="px-5 py-3 border  rounded-xl border-white/10 bg-richblack-700/30"
              >
                Aspect Ratio: 16:9
              </div>

              <div
                className="px-5 py-3 border  rounded-xl border-white/10 bg-richblack-700/30"
              >
                Max Recommended: 1024×576
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ERROR */}
      {errors[name] && (
        <span
          className="text-sm text-pink-300 "
        >
          {label} is required
        </span>
      )}
    </div>
  )
}