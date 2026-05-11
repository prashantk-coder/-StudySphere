import { motion } from "framer-motion"

import { FaCheck } from "react-icons/fa"

import {
  FiBook,
  FiLayers,
  FiUploadCloud,
} from "react-icons/fi"

import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"

import CourseInformationForm from "./CourseInformation/CourseInformationForm"

import PublishCourse from "./PublishCourse"

export default function RenderSteps() {
  const { step } = useSelector(
    (state) => state.course
  )

  const steps = [
    {
      id: 1,
      title: "Course Information",
      subtitle: "Basic details & thumbnail",
      icon: <FiBook />,
    },

    {
      id: 2,
      title: "Course Builder",
      subtitle: "Sections & lectures",
      icon: <FiLayers />,
    },

    {
      id: 3,
      title: "Publish",
      subtitle: "Visibility & release",
      icon: <FiUploadCloud />,
    },
  ]

  return (
    <div className="w-full">
      
      {/* STEPPER */}
      <div
        className="flex flex-col gap-6  mb-14 lg:flex-row"
      >
        {steps.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center flex-1 gap-4 "
          >
            {/* STEP CARD */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className={`
                relative flex flex-1
                items-center gap-4
                rounded-2xl border
                px-5 py-4
                transition-all duration-300

                ${
                  step === item.id
                    ? `
                      border-cyan-400/30
                      bg-cyan-400/10
                      shadow-lg shadow-cyan-500/10
                    `
                    : step > item.id
                    ? `
                      border-green-400/20
                      bg-green-400/5
                    `
                    : `
                      border-white/10
                      bg-richblack-700/20
                    `
                }
              `}
            >
              {/* ICON */}
              <div
                className={`
                  flex h-12 w-12
                  items-center justify-center
                  rounded-2xl text-lg
                  transition-all duration-300

                  ${
                    step === item.id
                      ? `
                        bg-cyan-400/20
                        text-cyan-300
                      `
                      : step > item.id
                      ? `
                        bg-green-400/20
                        text-green-300
                      `
                      : `
                        bg-richblack-700
                        text-richblack-300
                      `
                  }
                `}
              >
                {step > item.id ? (
                  <FaCheck />
                ) : (
                  item.icon
                )}
              </div>

              {/* TEXT */}
              <div>
                <h3
                  className={`
                    font-semibold

                    ${
                      step >= item.id
                        ? "text-richblack-5"
                        : "text-richblack-400"
                    }
                  `}
                >
                  {item.title}
                </h3>

                <p
                  className={`
                    mt-1 text-sm

                    ${
                      step >= item.id
                        ? "text-richblack-300"
                        : "text-richblack-500"
                    }
                  `}
                >
                  {item.subtitle}
                </p>
              </div>

              {/* STEP NUMBER */}
              <div
                className="absolute text-xs font-bold  right-4 top-4 text-richblack-500"
              >
                0{item.id}
              </div>
            </motion.div>

            {/* LINE */}
            {item.id !== steps.length && (
              <div
                className={`
                  hidden h-[2px]
                  w-12 rounded-full
                  lg:block

                  ${
                    step > item.id
                      ? "bg-green-400"
                      : "bg-richblack-700"
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* CONTENT AREA */}
      <motion.div
        key={step}
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {step === 1 && <CourseInformationForm />}

        {step === 2 && <CourseBuilderForm />}

        {step === 3 && <PublishCourse />}
      </motion.div>
    </div>
  )
}