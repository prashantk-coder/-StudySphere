import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students")

  const generateColors = (count) => {
    const colors = [
      "#06B6D4",
      "#EC4899",
      "#FACC15",
      "#8B5CF6",
      "#22C55E",
      "#F97316",
      "#3B82F6",
    ]

    return Array.from(
      { length: count },
      (_, i) => colors[i % colors.length]
    )
  }

  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Students",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateColors(courses.length),
        borderWidth: 2,
        borderColor: "#161D29",
      },
    ],
  }

  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Income",
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateColors(courses.length),
        borderWidth: 2,
        borderColor: "#161D29",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#F1F2FF",
          padding: 18,
          font: {
            size: 13,
          },
        },
      },
    },
  }

  return (
    <div className="p-6 rounded-2xl bg-richblack-800/40">
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-richblack-5">
            Analytics
          </h2>

          <p className="text-sm text-richblack-300">
            Students & revenue distribution
          </p>
        </div>

        {/* TOGGLE BUTTONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              currChart === "students"
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                : "bg-richblack-700 text-richblack-300"
            }`}
          >
            Students
          </button>

          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              currChart === "income"
                ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                : "bg-richblack-700 text-richblack-300"
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* CHART */}
      <div className="mx-auto h-[420px] max-w-[500px]">
        <Pie
          data={
            currChart === "students"
              ? chartDataStudents
              : chartIncomeData
          }
          options={options}
        />
      </div>
    </div>
  )
}