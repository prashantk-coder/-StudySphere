import { motion } from "framer-motion"
import { FaArrowRight, FaBolt, FaChartLine, FaCode, FaCrown, FaPlay, FaShieldAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

import Banner from "../assets/Images/banner.mp4"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"

const stats = [
  { label: "active learners", value: "84K+" },
  { label: "mentor led courses", value: "1.2K" },
  { label: "avg completion lift", value: "37%" },
  { label: "live rooms/month", value: "9.8K" },
]

const pillars = [
  {
    icon: FaPlay,
    title: "Immersive course player",
    copy: "Video progress, bookmarks, markdown notes, resources, certificates, and streaks live in one focused workspace.",
  },
  {
    icon: FaChartLine,
    title: "Instructor intelligence",
    copy: "Revenue, learner drop-offs, reviews, quiz performance, and approval status are shaped for fast decisions.",
  },
  {
    icon: FaBolt,
    title: "Gamified momentum",
    copy: "XP, badges, daily challenges, leaderboards, and Duolingo-style streak loops keep learning alive.",
  },
  {
    icon: FaCode,
    title: "Practice rooms",
    copy: "Coding playgrounds, interview rooms, discussion threads, live chat, and whiteboards support cohort energy.",
  },
]

const adminCards = [
  "Course approvals",
  "Payment monitoring",
  "Reported content",
  "Revenue tracking",
  "User trust controls",
  "Subscription health",
]

function Home() {
  return (
    <div className="overflow-hidden bg-[#050816] text-white">
      <section className="relative min-h-[calc(100vh-72px)] px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.22),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.26),transparent_30%),linear-gradient(135deg,rgba(5,8,22,0.92),rgba(10,18,35,0.96))]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050816] to-transparent" />

        <div className="relative mx-auto grid max-w-maxContent items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-richblack-50 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <FaCrown className="text-yellow-50" />
              StudySphere Pro is live with Razorpay subscriptions
            </div>

            <div className="space-y-6">
              <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
                StudySphere
                <span className="block bg-gradient-to-r from-caribbeangreen-50 via-blue-100 to-pink-100 bg-clip-text text-transparent">
                  learning that feels alive.
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-richblack-100">
                A complete EdTech operating system for students, instructors, and admins with premium courses,
                realtime communities, gamified progress, secure Razorpay checkout, and polished dashboards.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/catalog/web-development"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-caribbeangreen-100 px-6 py-3 font-semibold text-richblack-900 transition hover:bg-caribbeangreen-50"
              >
                Explore courses <FaArrowRight />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
              >
                Start free
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                  <div className="text-2xl font-semibold text-white">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-richblack-200">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <video className="aspect-video w-full object-cover" muted loop autoPlay playsInline>
                <source src={Banner} type="video/mp4" />
              </video>
              <div className="grid gap-3 border-t border-white/10 p-4 sm:grid-cols-3">
                <div className="rounded-md bg-richblack-900/70 p-3">
                  <div className="text-xs text-richblack-200">Today</div>
                  <div className="mt-1 text-xl font-semibold">142 min</div>
                </div>
                <div className="rounded-md bg-richblack-900/70 p-3">
                  <div className="text-xs text-richblack-200">Streak</div>
                  <div className="mt-1 text-xl font-semibold text-yellow-50">18 days</div>
                </div>
                <div className="rounded-md bg-richblack-900/70 p-3">
                  <div className="text-xs text-richblack-200">XP</div>
                  <div className="mt-1 text-xl font-semibold text-caribbeangreen-50">12,480</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#08111f] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-maxContent">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-caribbeangreen-50">
                Student experience
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Everything after enrollment matters.</h2>
            </div>
            <p className="max-w-xl text-richblack-200">
              StudySphere combines the polish of a SaaS dashboard with the emotional loops that make learners return.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, copy }) => (
              <motion.div
                key={title}
                whileHover={{ y: -6 }}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-caribbeangreen-50">
                  <Icon />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-richblack-200">{copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-maxContent gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-100">Command center</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built for admins and operators.</h2>
            <p className="mt-4 text-richblack-200">
              Admins can approve courses, monitor payments, moderate reported content, and track subscription revenue
              without digging through backend logs.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-richblack-100">
              <FaShieldAlt className="text-caribbeangreen-50" />
              JWT, role middleware, rate limiting, Helmet, CORS, and webhook signatures
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {adminCards.map((card) => (
              <div key={card} className="rounded-lg border border-white/10 bg-white/[0.06] p-5 text-richblack-50">
                {card}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-maxContent px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">Learners stay because momentum is visible.</h2>
        <div className="mt-8">
          <ReviewSlider />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
