import React, { useEffect, useState } from "react"
import Footer from "../components/common/Footer"
import { useParams } from "react-router-dom"
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogaPageData } from "../services/operations/pageAndComponentData"
import Course_Card from "../components/core/Catalog/Course_Card"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)

  const { catalogName } = useParams()

  const [active, setActive] = useState(1)

  const [catalogPageData, setCatalogPageData] = useState(null)

  const [categoryId, setCategoryId] = useState("")

  // Fetch Category ID
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector(
          "GET",
          categories.CATEGORIES_API
        )

        const category_id = res?.data?.data?.filter(
          (ct) =>
            ct.name.split(" ").join("-").toLowerCase() ===
            catalogName
        )[0]?._id

        setCategoryId(category_id)
      } catch (error) {
        console.log(error)
      }
    }

    getCategories()
  }, [catalogName])

  // Fetch Category Page Data
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(categoryId)

        setCatalogPageData(res)
      } catch (error) {
        console.log(error)
      }
    }

    if (categoryId) {
      getCategoryDetails()
    }
  }, [categoryId])

  // Loading
  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
        <div className="border-4 rounded-full h-14 w-14 animate-spin border-richblack-700 border-t-cyan-400"></div>
      </div>
    )
  }

  // Error
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div className="text-white bg-richblack-900">

      {/* HERO SECTION */}
      <div className="border-b border-richblack-700 bg-richblack-800">
        <div
          className="
            mx-auto flex min-h-[260px]
            max-w-[1200px]
            flex-col justify-center gap-4
            px-6
          "
        >
          <p className="text-sm text-richblack-300">
            Home / Catalog /
            <span className="ml-1 text-yellow-50">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>

          <h1 className="text-5xl font-extrabold text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>

          <p className="max-w-[850px] text-lg text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* SECTION 1 */}
      <div className="mx-auto max-w-[1200px] px-6 py-14">

        <h2 className="text-4xl font-bold text-richblack-5">
          Courses to get you started
        </h2>

        {/* Tabs */}
        <div className="flex mt-6 text-sm border-b border-richblack-700">

          <button
            className={`px-4 py-3 transition-all duration-200 ${
              active === 1
                ? "border-b-2 border-yellow-50 text-yellow-50"
                : "text-richblack-300"
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </button>

          <button
            className={`px-4 py-3 transition-all duration-200 ${
              active === 2
                ? "border-b-2 border-yellow-50 text-yellow-50"
                : "text-richblack-300"
            }`}
            onClick={() => setActive(2)}
          >
            New
          </button>
        </div>

        {/* Slider */}
        <div className="mt-10">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="mx-auto max-w-[1200px] px-6 py-14">

        <h2 className="text-4xl font-bold text-richblack-5">
          Top courses in{" "}
          {catalogPageData?.data?.differentCategory?.name}
        </h2>

        <div className="mt-10">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="mx-auto max-w-[1200px] px-6 py-14">

        <h2 className="text-4xl font-bold text-richblack-5">
          Frequently Bought
        </h2>

        <div className="grid grid-cols-1 gap-8 mt-10 lg:grid-cols-2">

          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <Course_Card
                key={i}
                course={course}
                Height={"h-[220px]"}
              />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog