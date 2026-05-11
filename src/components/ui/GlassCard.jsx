import React from "react"

export default function GlassCard({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_20px_60px_-30px_rgba(0,0,0,0.8)]",
        "dark:bg-white/5 dark:border-white/10",
        "bg-richblack-800/60 border-richblack-700/60",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

