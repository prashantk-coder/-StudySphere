import { useEffect, useState } from "react"

import { motion } from "framer-motion"

import { useForm } from "react-hook-form"

import { toast } from "react-hot-toast"

import {
  FiPlayCircle,
  FiVideo,
} from "react-icons/fi"

import { RxCross2 } from "react-icons/rx"

import {
  useDispatch,
  useSelector,
} from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"

import { setCourse } from "../../../../../slices/courseSlice"

import IconBtn from "../../../../common/IconBtn"

import Upload from "../Upload"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  const dispatch = useDispatch()

  const [loading, setLoading] =
    useState(false)

  const { token } = useSelector(
    (state) => state.auth
  )

  const { course } = useSelector(
    (state) => state.course
  )

  useEffect(() => {
    if (view || edit) {
      setValue(
        "lectureTitle",
        modalData.title
      )

      setValue(
        "lectureDesc",
        modalData.description
      )

      setValue(
        "lectureVideo",
        modalData.videoUrl
      )
    }
  }, [])

  // CHECK UPDATED
  const isFormUpdated = () => {
    const currentValues = getValues()

    if (
      currentValues.lectureTitle !==
        modalData.title ||
      currentValues.lectureDesc !==
        modalData.description ||
      currentValues.lectureVideo !==
        modalData.videoUrl
    ) {
      return true
    }

    return false
  }

  // EDIT SUBSECTION
  const handleEditSubsection =
    async () => {
      const currentValues =
        getValues()

      const formData = new FormData()

      formData.append(
        "sectionId",
        modalData.sectionId
      )

      formData.append(
        "subSectionId",
        modalData._id
      )

      if (
        currentValues.lectureTitle !==
        modalData.title
      ) {
        formData.append(
          "title",
          currentValues.lectureTitle
        )
      }

      if (
        currentValues.lectureDesc !==
        modalData.description
      ) {
        formData.append(
          "description",
          currentValues.lectureDesc
        )
      }

      if (
        currentValues.lectureVideo !==
        modalData.videoUrl
      ) {
        formData.append(
          "video",
          currentValues.lectureVideo
        )
      }

      setLoading(true)

      const result =
        await updateSubSection(
          formData,
          token
        )

      if (result) {
        const updatedCourseContent =
          course.courseContent.map(
            (section) =>
              section._id ===
              modalData.sectionId
                ? result
                : section
          )

        const updatedCourse = {
          ...course,
          courseContent:
            updatedCourseContent,
        }

        dispatch(setCourse(updatedCourse))
      }

      setModalData(null)

      setLoading(false)
    }

  // SUBMIT
  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error(
          "No changes made to the form"
        )
      } else {
        handleEditSubsection()
      }

      return
    }

    const formData = new FormData()

    formData.append(
      "sectionId",
      modalData
    )

    formData.append(
      "title",
      data.lectureTitle
    )

    formData.append(
      "description",
      data.lectureDesc
    )

    formData.append(
      "video",
      data.lectureVideo
    )

    setLoading(true)

    const result =
      await createSubSection(
        formData,
        token
      )

    if (result) {
      const updatedCourseContent =
        course.courseContent.map(
          (section) =>
            section._id === modalData
              ? result
              : section
        )

      const updatedCourse = {
        ...course,
        courseContent:
          updatedCourseContent,
      }

      dispatch(setCourse(updatedCourse))
    }

    setModalData(null)

    setLoading(false)
  }

  return (
    <div
      className="
        fixed inset-0 z-[1000]
        grid place-items-center
        overflow-y-auto
        bg-black/60
        px-4 py-10
        backdrop-blur-md
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        className="w-full max-w-3xl overflow-hidden border shadow-2xl  rounded-3xl border-white/10 bg-richblack-800/95"
      >
        {/* HEADER */}
        <div
          className="flex items-center justify-between px-8 py-6 border-b  border-white/10 bg-richblack-700/40"
        >
          <div className="flex items-center gap-4">
            
            <div
              className="flex items-center justify-center  h-14 w-14 rounded-2xl bg-cyan-400/10"
            >
              <FiVideo
                className="text-2xl  text-cyan-300"
              />
            </div>

            <div>
              <h2
                className="text-2xl font-bold  text-richblack-5"
              >
                {view &&
                  "View Lecture"}

                {add &&
                  "Add New Lecture"}

                {edit &&
                  "Edit Lecture"}
              </h2>

              <p
                className="mt-1 text-sm  text-richblack-300"
              >
                Upload lecture videos and
                organize learning content.
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              !loading
                ? setModalData(null)
                : {}
            }
            className="p-3 transition-all duration-200  rounded-xl hover:bg-richblack-700"
          >
            <RxCross2
              className="text-2xl  text-richblack-200"
            />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-8"
        >
          {/* VIDEO */}
          <div
            className="p-6 border  rounded-2xl border-richblack-700 bg-richblack-900/30"
          >
            <div className="mb-4">
              
              <div className="flex items-center gap-3">
                <FiPlayCircle
                  className="text-xl  text-cyan-300"
                />

                <h3
                  className="text-lg font-semibold  text-richblack-5"
                >
                  Lecture Video
                </h3>
              </div>

              <p
                className="mt-2 text-sm  text-richblack-300"
              >
                Upload a high quality
                lecture video for students.
              </p>
            </div>

            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={
                view
                  ? modalData.videoUrl
                  : null
              }
              editData={
                edit
                  ? modalData.videoUrl
                  : null
              }
            />
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            
            <label
              className="text-sm font-medium  text-richblack-100"
              htmlFor="lectureTitle"
            >
              Lecture Title{" "}

              {!view && (
                <sup className="text-pink-300">
                  *
                </sup>
              )}
            </label>

            <input
              disabled={
                view || loading
              }
              id="lectureTitle"
              placeholder="e.g. Introduction to React Hooks"
              {...register(
                "lectureTitle",
                {
                  required: true,
                }
              )}
              className="w-full px-4 py-3 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

            {errors.lectureTitle && (
              <span
                className="text-sm text-pink-300 "
              >
                Lecture title is
                required
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            
            <label
              className="text-sm font-medium  text-richblack-100"
              htmlFor="lectureDesc"
            >
              Lecture Description{" "}

              {!view && (
                <sup className="text-pink-300">
                  *
                </sup>
              )}
            </label>

            <textarea
              disabled={
                view || loading
              }
              id="lectureDesc"
              placeholder="Describe what students will learn in this lecture..."
              {...register(
                "lectureDesc",
                {
                  required: true,
                }
              )}
              className="
                min-h-[160px] w-full
                resize-none rounded-2xl
                border border-white/10
                bg-richblack-700/40
                px-4 py-3 text-white
                outline-none transition-all
                duration-300
                placeholder:text-richblack-400
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/20
              "
            />

            {errors.lectureDesc && (
              <span
                className="text-sm text-pink-300 "
              >
                Lecture description is
                required
              </span>
            )}
          </div>

          {/* ACTIONS */}
          {!view && (
            <div
              className="flex justify-end gap-4 pt-6 border-t  border-white/10"
            >
              <button
                type="button"
                onClick={() =>
                  setModalData(null)
                }
                className="px-6 py-3 font-semibold transition-all duration-300 border  rounded-2xl border-white/10 bg-richblack-700/40 text-richblack-50 hover:bg-richblack-700"
              >
                Cancel
              </button>

              <IconBtn
                disabled={loading}
                text={
                  loading
                    ? "Processing..."
                    : edit
                    ? "Save Changes"
                    : "Save Lecture"
                }
              />
            </div>
          )}
        </form>
      </motion.div>
    </div>
  )
}