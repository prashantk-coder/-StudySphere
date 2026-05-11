import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import GlassCard from "../components/ui/GlassCard"
import Skeleton from "../components/ui/Skeleton"
import { getWishlist, removeFromWishlist } from "../services/operations/wishlistAPI"

export default function Wishlist() {
  const { token } = useSelector((s) => s.auth)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      const data = await getWishlist(token)
      if (mounted) setItems(data)
      setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [token])

  return (
    <div className="mx-auto w-full max-w-maxContent py-8 text-richblack-5">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Wishlist</h1>
        <p className="mt-1 text-richblack-300">Save courses to buy later.</p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
      ) : items.length === 0 ? (
        <GlassCard className="p-6">
          <p className="text-richblack-200">No items yet.</p>
          <Link
            to="/"
            className="mt-3 inline-block rounded-lg bg-yellow-50 px-4 py-2 font-semibold text-richblack-900 hover:opacity-95 transition"
          >
            Browse courses
          </Link>
        </GlassCard>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((c) => (
            <GlassCard key={c._id} className="p-5">
              <div className="flex gap-4">
                <img
                  src={c.thumbnail}
                  alt={c.courseName}
                  className="h-20 w-28 rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <Link to={`/courses/${c._id}`} className="text-lg font-semibold hover:underline">
                    {c.courseName}
                  </Link>
                  <p className="mt-1 line-clamp-2 text-sm text-richblack-300">
                    {c.courseDescription}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-yellow-25 font-semibold">₹{c.price}</span>
                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await removeFromWishlist(c._id, token)
                        if (ok) setItems((prev) => prev.filter((x) => x._id !== c._id))
                      }}
                      className="rounded-lg border border-richblack-600 bg-richblack-800 px-3 py-2 text-sm hover:bg-richblack-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}

