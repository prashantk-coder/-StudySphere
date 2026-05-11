import { useState } from "react"

import {
  AiFillCaretDown,
} from "react-icons/ai"

import { FaPlus } from "react-icons/fa"

import {
  MdEdit,
  MdOutlineOndemandVideo,
} from "react-icons/md"

import { RiDeleteBin6Line } from "react-icons/ri"

import { RxDropdownMenu } from "react-icons/rx"

import {
  useDispatch,
  useSelector,
} from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"

import { setCourse } from "../../../../../slices/courseSlice"

import ConfirmationModal from "../../../../common/ConfirmationModal"

import SubSectionModal from "./SubSectionModal"

export default function NestedView({
  handleChangeEditSectionName,
}) {
  const { course } = useSelector(
    (state) => state.course
  )

  const { token } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()

  const [addSubSection, setAddSubsection] =
    useState(null)

  const [viewSubSection, setViewSubSection] =
    useState(null)

  const [editSubSection, setEditSubSection] =
    useState(null)

  const [confirmationModal, setConfirmationModal] =
    useState(null)

  const handleDeleleSection = async (
    sectionId
  ) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })

    if (result) {
      dispatch(setCourse(result))
    }

    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (
    subSectionId,
    sectionId
  ) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    })

    if (result) {
      const updatedCourseContent =
        course.courseContent.map((section) =>
          section._id === sectionId
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

    setConfirmationModal(null)
  }

  return (
    <>
      <div className="space-y-6">
        
        {course?.courseContent?.map(
          (section, index) => (
            <details
              key={section._id}
              open
              className="overflow-hidden transition-all duration-300 border  rounded-2xl border-richblack-700 bg-richblack-800/70 backdrop-blur-md"
            >
              {/* SECTION HEADER */}
              <summary
                className="flex items-center justify-between gap-4 px-6 py-5 transition-all duration-300 cursor-pointer  hover:bg-richblack-700/30"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  
                  <div
                    className="flex items-center justify-center  h-11 w-11 rounded-xl bg-yellow-50/10"
                  >
                    <RxDropdownMenu className="text-2xl text-yellow-50" />
                  </div>

                  <div>
                    <h3
                      className="text-lg font-semibold  text-richblack-5"
                    >
                      {section.sectionName}
                    </h3>

                    <p
                      className="mt-1 text-sm  text-richblack-300"
                    >
                      {
                        section.subSection
                          .length
                      }{" "}
                      Lectures
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  
                  <button
                    onClick={() =>
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }
                    className="p-2 transition-all duration-200 rounded-lg  hover:bg-richblack-700"
                  >
                    <MdEdit
                      className="text-xl  text-richblack-300 hover:text-yellow-50"
                    />
                  </button>

                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1:
                          "Delete this Section?",
                        text2:
                          "All lectures inside this section will be deleted permanently.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleleSection(
                            section._id
                          ),
                        btn2Handler: () =>
                          setConfirmationModal(
                            null
                          ),
                      })
                    }
                    className="p-2 transition-all duration-200 rounded-lg  hover:bg-red-500/10"
                  >
                    <RiDeleteBin6Line
                      className="text-xl  text-richblack-300 hover:text-red-400"
                    />
                  </button>

                  <AiFillCaretDown
                    className="text-lg  text-richblack-400"
                  />
                </div>
              </summary>

              {/* LECTURES */}
              <div className="px-6 pb-6 space-y-4">
                
                {section.subSection.map(
                  (data, i) => (
                    <div
                      key={data?._id}
                      onClick={() =>
                        setViewSubSection(data)
                      }
                      className="flex items-center justify-between px-5 py-4 transition-all duration-300 border cursor-pointer  group rounded-2xl border-richblack-700 bg-richblack-900/40 hover:border-yellow-50/20 hover:bg-richblack-700/20"
                    >
                      {/* LEFT */}
                      <div className="flex items-center gap-4">
                        
                        <div
                          className="flex items-center justify-center w-10 h-10  rounded-xl bg-cyan-400/10"
                        >
                          <MdOutlineOndemandVideo
                            className="text-xl  text-cyan-300"
                          />
                        </div>

                        <div>
                          <h4
                            className="font-medium  text-richblack-5"
                          >
                            {data.title}
                          </h4>

                          <p
                            className="mt-1 text-xs  text-richblack-400"
                          >
                            Lecture {i + 1}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT */}
                      <div
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                        className="flex items-center gap-3 "
                      >
                        <button
                          onClick={() =>
                            setEditSubSection({
                              ...data,
                              sectionId:
                                section._id,
                            })
                          }
                          className="p-2 transition-all duration-200 rounded-lg  hover:bg-richblack-700"
                        >
                          <MdEdit
                            className="text-xl  text-richblack-300 hover:text-yellow-50"
                          />
                        </button>

                        <button
                          onClick={() =>
                            setConfirmationModal({
                              text1:
                                "Delete this Lecture?",
                              text2:
                                "This lecture will be permanently deleted.",
                              btn1Text:
                                "Delete",
                              btn2Text:
                                "Cancel",
                              btn1Handler: () =>
                                handleDeleteSubSection(
                                  data._id,
                                  section._id
                                ),
                              btn2Handler:
                                () =>
                                  setConfirmationModal(
                                    null
                                  ),
                            })
                          }
                          className="p-2 transition-all duration-200 rounded-lg  hover:bg-red-500/10"
                        >
                          <RiDeleteBin6Line
                            className="text-xl  text-richblack-300 hover:text-red-400"
                          />
                        </button>
                      </div>
                    </div>
                  )
                )}

                {/* ADD LECTURE */}
                <button
                  onClick={() =>
                    setAddSubsection(
                      section._id
                    )
                  }
                  className="flex items-center gap-3 px-5 py-4 mt-4 transition-all duration-300 border border-dashed  rounded-xl border-yellow-50/30 bg-yellow-50/5 text-yellow-50 hover:bg-yellow-50/10"
                >
                  <FaPlus className="text-sm" />

                  <span className="font-medium">
                    Add New Lecture
                  </span>
                </button>
              </div>
            </details>
          )
        )}
      </div>

      {/* MODALS */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}

      {/* CONFIRMATION MODAL */}
      {confirmationModal ? (
        <ConfirmationModal
          modalData={confirmationModal}
        />
      ) : null}
    </>
  )
}