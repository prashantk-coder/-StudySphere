import { useState } from "react"

import { VscSignOut } from "react-icons/vsc"

import {
  useDispatch,
  useSelector,
} from "react-redux"

import { useNavigate } from "react-router-dom"

import { motion } from "framer-motion"

import { sidebarLinks } from "../../../data/dashboard-links"

import { logout } from "../../../services/operations/authAPI"

import ConfirmationModal from "../../common/ConfirmationModal"

import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const {
    user,
    loading: profileLoading,
  } = useSelector((state) => state.profile)

  const { loading: authLoading } =
    useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] =
    useState(null)

  if (profileLoading || authLoading) {
    return (
      <div
        className="
          grid min-h-screen min-w-[260px]
          place-items-center
          border-r border-white/10
          bg-richblack-900
        "
      >
        <div
          className="w-12 h-12 border-4 rounded-full  animate-spin border-richblack-700 border-t-cyan-400"
        />
      </div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="
          sticky top-[78px]
          flex min-h-[calc(100vh-78px)]
          min-w-[260px] flex-col
          justify-between
          border-r border-white/10
          bg-richblack-900/90
          px-4 py-8
          backdrop-blur-xl
        "
      >
        {/* TOP */}
        <div>
          
          {/* USER */}
          <div
            className="flex items-center gap-3 p-4 mb-8 border  rounded-2xl border-white/10 bg-richblack-800/70"
          >
            <div
              className="grid w-12 h-12 text-lg font-bold text-black rounded-full  place-items-center bg-gradient-to-br from-cyan-400 to-blue-500"
            >
              {user?.firstName?.charAt(0)}
            </div>

            <div className="overflow-hidden">
              <h2 className="text-sm font-semibold text-white truncate">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="text-xs truncate text-richblack-300">
                {user?.email}
              </p>
            </div>
          </div>

          {/* LINKS */}
          <div className="flex flex-col gap-2">
            {sidebarLinks.map((link) => {
              if (
                link.type &&
                user?.accountType !== link.type
              )
                return null

              return (
                <SidebarLink
                  key={link.id}
                  link={link}
                  iconName={link.icon}
                />
              )
            })}
          </div>
        </div>

        {/* BOTTOM */}
        <div>
          
          <div className="my-6 h-[1px] w-full bg-white/10" />

          <div className="flex flex-col gap-2">
            
            <SidebarLink
              link={{
                name: "Settings",
                path: "/dashboard/settings",
              }}
              iconName="VscSettingsGear"
            />

            {/* LOGOUT */}
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2:
                    "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () =>
                    dispatch(logout(navigate)),
                  btn2Handler: () =>
                    setConfirmationModal(null),
                })
              }
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300  group rounded-xl text-richblack-300 hover:bg-red-500/10 hover:text-red-400"
            >
              <VscSignOut
                className="text-lg transition-all duration-300  group-hover:scale-110"
              />

              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
        />
      )}
    </>
  )
}