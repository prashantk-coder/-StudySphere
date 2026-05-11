import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { HiOutlineSparkles } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"

import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"

import IconBtn from "../../../../common/IconBtn"
import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)

  const dispatch = useDispatch()

  // HANDLE SUBMIT
  const onSubmit = async (data) => {
    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }

    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  // EDIT SECTION
  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }

    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  // NEXT
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section")
      return
    }

    if (
      course.courseContent.some(
        (section) => section.subSection.length === 0
      )
    ) {
      toast.error("Please add at least one lecture in each section")
      return
    }

    dispatch(setStep(3))
  }

  // BACK
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className="p-8 border shadow-2xl rounded-2xl border-richblack-700 bg-richblack-800/70 backdrop-blur-sm">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-50/10">
          <HiOutlineSparkles className="text-2xl text-yellow-50" />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-richblack-5">
            Course Builder
          </h2>

          <p className="mt-1 text-sm text-richblack-300">
            Organize your course into sections and lectures
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded-xl border-richblack-700 bg-richblack-900/40"
      >
        <div className="flex flex-col gap-3">
          <label
            className="text-sm font-medium text-richblack-5"
            htmlFor="sectionName"
          >
            Section Name <sup className="text-pink-200">*</sup>
          </label>

          <input
            id="sectionName"
            disabled={loading}
            placeholder="e.g. Introduction to React"
            {...register("sectionName", { required: true })}
            className="w-full px-4 py-3 transition-all duration-300 border outline-none rounded-xl border-richblack-600 bg-richblack-700 text-richblack-5 placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-2 focus:ring-yellow-50/30"
          />

          {errors.sectionName && (
            <span className="ml-1 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-4 mt-6">
          <IconBtn
            type="submit"
            disabled={loading}
            text={
              loading
                ? "Processing..."
                : editSectionName
                ? "Update Section"
                : "Create Section"
            }
          >
            <IoAddCircleOutline size={20} />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 text-sm transition-all duration-200 border rounded-lg border-richblack-600 text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* NESTED VIEW */}
      {course?.courseContent?.length > 0 && (
        <div className="mt-8">
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        </div>
      )}

      {/* EMPTY STATE */}
      {course?.courseContent?.length === 0 && (
        <div className="py-16 mt-8 text-center border border-dashed rounded-2xl border-richblack-600 bg-richblack-900/30">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-richblack-700">
            <IoAddCircleOutline className="text-3xl text-yellow-50" />
          </div>

          <h3 className="text-xl font-semibold text-richblack-5">
            No Sections Yet
          </h3>

          <p className="mt-2 text-sm text-richblack-400">
            Start building your course by creating your first section
          </p>
        </div>
      )}

      {/* FOOTER BUTTONS */}
      <div className="flex justify-end gap-4 pt-6 mt-10 border-t border-richblack-700">
        <button
          onClick={goBack}
          className="px-6 py-3 font-medium transition-all duration-200 border rounded-xl border-richblack-600 bg-richblack-700 text-richblack-50 hover:bg-richblack-600"
        >
          Back
        </button>

        <button
          onClick={goToNext}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-[1.02] hover:bg-yellow-25"
        >
          Next
          <MdNavigateNext className="text-xl" />
        </button>
      </div>
    </div>
  )
}