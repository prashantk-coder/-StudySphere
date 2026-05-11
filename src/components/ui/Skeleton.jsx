import React from "react"

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={[
        "animate-pulse rounded-lg bg-richblack-700/60",
        "dark:bg-white/10",
        className,
      ].join(" ")}
    />
  )
}

