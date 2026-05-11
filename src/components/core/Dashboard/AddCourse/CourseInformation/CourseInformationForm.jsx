import { motion } from "framer-motion"

import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"

import { toast } from "react-hot-toast"

import { HiOutlineCurrencyRupee } from "react-icons/hi"

import {
  MdNavigateNext,
  MdOutlineAutoAwesome,
} from "react-icons/md"

import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"

import {
  setCourse,
  setStep,
} from "../../../../../slices/courseSlice"

import { COURSE_STATUS } from "../../../../../utils/constants"

import IconBtn from "../../../../common/IconBtn"

import Upload from "../Upload"

import ChipInput from "./ChipInput"

import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const { token } = useSelector(
    (state) => state.auth
  )

  const { course, editCourse } = useSelector(
    (state) => state.course
  )

  const [loading, setLoading] = useState(false)

  const [courseCategories, setCourseCategories] =
    useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)

      const categories =
        await fetchCourseCategories()

      if (categories.length > 0) {
        setCourseCategories(categories)
      }

      setLoading(false)
    }

    if (editCourse) {
      setValue(
        "courseTitle",
        course.courseName
      )

      setValue(
        "courseShortDesc",
        course.courseDescription
      )

      setValue("coursePrice", course.price)

      setValue("courseTags", course.tag)

      setValue(
        "courseBenefits",
        course.whatYouWillLearn
      )

      setValue(
        "courseCategory",
        course.category
      )

      setValue(
        "courseRequirements",
        course.instructions
      )

      setValue(
        "courseImage",
        course.thumbnail
      )
    }

    getCategories()

    // eslint-disable-next-line
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()

    if (
      currentValues.courseTitle !==
        course.courseName ||
      currentValues.courseShortDesc !==
        course.courseDescription ||
      currentValues.coursePrice !==
        course.price ||
      currentValues.courseTags.toString() !==
        course.tag.toString() ||
      currentValues.courseBenefits !==
        course.whatYouWillLearn ||
      currentValues.courseCategory._id !==
        course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !==
        course.thumbnail
    ) {
      return true
    }

    return false
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()

        const formData = new FormData()

        formData.append(
          "courseId",
          course._id
        )

        if (
          currentValues.courseTitle !==
          course.courseName
        ) {
          formData.append(
            "courseName",
            data.courseTitle
          )
        }

        if (
          currentValues.courseShortDesc !==
          course.courseDescription
        ) {
          formData.append(
            "courseDescription",
            data.courseShortDesc
          )
        }

        if (
          currentValues.coursePrice !==
          course.price
        ) {
          formData.append(
            "price",
            data.coursePrice
          )
        }

        if (
          currentValues.courseTags.toString() !==
          course.tag.toString()
        ) {
          formData.append(
            "tag",
            JSON.stringify(data.courseTags)
          )
        }

        if (
          currentValues.courseBenefits !==
          course.whatYouWillLearn
        ) {
          formData.append(
            "whatYouWillLearn",
            data.courseBenefits
          )
        }

        if (
          currentValues.courseCategory._id !==
          course.category._id
        ) {
          formData.append(
            "category",
            data.courseCategory
          )
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(
              data.courseRequirements
            )
          )
        }

        if (
          currentValues.courseImage !==
          course.thumbnail
        ) {
          formData.append(
            "thumbnailImage",
            data.courseImage
          )
        }

        setLoading(true)

        const result =
          await editCourseDetails(
            formData,
            token
          )

        setLoading(false)

        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error(
          "No changes made to the form"
        )
      }

      return
    }

    const formData = new FormData()

    formData.append(
      "courseName",
      data.courseTitle
    )

    formData.append(
      "courseDescription",
      data.courseShortDesc
    )

    formData.append(
      "price",
      data.coursePrice
    )

    formData.append(
      "tag",
      JSON.stringify(data.courseTags)
    )

    formData.append(
      "whatYouWillLearn",
      data.courseBenefits
    )

    formData.append(
      "category",
      data.courseCategory
    )

    formData.append(
      "status",
      COURSE_STATUS.DRAFT
    )

    formData.append(
      "instructions",
      JSON.stringify(
        data.courseRequirements
      )
    )

    formData.append(
      "thumbnailImage",
      data.courseImage
    )

    setLoading(true)

    const result = await addCourseDetails(
      formData,
      token
    )

    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }

    setLoading(false)
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* HEADER */}
      <div
        className="p-6 border  rounded-3xl border-cyan-400/10 bg-cyan-400/5"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-12 h-12  rounded-2xl bg-cyan-400/10"
          >
            <MdOutlineAutoAwesome className="text-2xl text-cyan-300" />
          </div>

          <div>
            <h2
              className="text-2xl font-bold  text-richblack-5"
            >
              Course Information
            </h2>

            <p className="text-sm text-richblack-300">
              Add the basic details of your
              course.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN FORM */}
      <div
        className="p-8 space-y-8 border  rounded-3xl border-white/10 bg-richblack-800/60 backdrop-blur-md"
      >
        {/* TITLE */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium  text-richblack-100"
            htmlFor="courseTitle"
          >
            Course Title
          </label>

          <input
            id="courseTitle"
            placeholder="e.g. Complete MERN Stack Bootcamp"
            {...register("courseTitle", {
              required: true,
            })}
            className="w-full px-4 py-3 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />

          {errors.courseTitle && (
            <span className="text-sm text-pink-300">
              Course title is required
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium  text-richblack-100"
            htmlFor="courseShortDesc"
          >
            Course Description
          </label>

          <textarea
            id="courseShortDesc"
            placeholder="Describe your course..."
            {...register("courseShortDesc", {
              required: true,
            })}
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

          {errors.courseShortDesc && (
            <span className="text-sm text-pink-300">
              Course description is required
            </span>
          )}
        </div>

        {/* PRICE + CATEGORY */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* PRICE */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium  text-richblack-100"
              htmlFor="coursePrice"
            >
              Course Price
            </label>

            <div className="relative">
              <input
                id="coursePrice"
                placeholder="2999"
                {...register("coursePrice", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full py-3 pl-12 pr-4 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 placeholder:text-richblack-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />

              <HiOutlineCurrencyRupee
                className="absolute text-2xl -translate-y-1/2  left-4 top-1/2 text-richblack-400"
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium  text-richblack-100"
              htmlFor="courseCategory"
            >
              Course Category
            </label>

            <select
              {...register("courseCategory", {
                required: true,
              })}
              defaultValue=""
              id="courseCategory"
              className="w-full px-4 py-3 text-white transition-all duration-300 border outline-none  rounded-2xl border-white/10 bg-richblack-700/40 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            >
              <option value="" disabled>
                Choose a Category
              </option>

              {!loading &&
                courseCategories?.map(
                  (category, indx) => (
                    <option
                      key={indx}
                      value={category?._id}
                    >
                      {category?.name}
                    </option>
                  )
                )}
            </select>
          </div>
        </div>

        {/* TAGS */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* THUMBNAIL */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={
            editCourse
              ? course?.thumbnail
              : null
          }
        />

        {/* BENEFITS */}
        <div className="space-y-2">
          <label
            className="text-sm font-medium  text-richblack-100"
            htmlFor="courseBenefits"
          >
            Benefits of this Course
          </label>

          <textarea
            id="courseBenefits"
            placeholder="What students will learn..."
            {...register("courseBenefits", {
              required: true,
            })}
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
        </div>

        {/* REQUIREMENTS */}
        <RequirementsField
          name="courseRequirements"
          label="Requirements / Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />

        {/* BUTTONS */}
        <div
          className="flex flex-wrap justify-end gap-4 pt-4 "
        >
          {editCourse && (
            <button
              onClick={() =>
                dispatch(setStep(2))
              }
              disabled={loading}
              className="px-6 py-3 font-semibold transition-all duration-300 border  rounded-2xl border-white/10 bg-richblack-700/40 text-richblack-50 hover:bg-richblack-700"
            >
              Continue Without Saving
            </button>
          )}

          <IconBtn
            disabled={loading}
            text={
              !editCourse
                ? "Continue"
                : "Save Changes"
            }
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </div>
    </motion.form>
  )
}