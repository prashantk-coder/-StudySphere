import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { wishlistEndpoints } from "../apis"

const { GET_WISHLIST_API, ADD_WISHLIST_API, REMOVE_WISHLIST_API } = wishlistEndpoints

export async function getWishlist(token) {
  try {
    const res = await apiConnector("GET", GET_WISHLIST_API, null, {
      Authorization: `Bearer ${token}`,
    })
    return res?.data?.data || []
  } catch (e) {
    toast.error("Could not load wishlist")
    return []
  }
}

export async function addToWishlist(courseId, token) {
  try {
    const res = await apiConnector(
      "POST",
      ADD_WISHLIST_API,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )
    if (!res?.data?.success) throw new Error(res?.data?.message)
    toast.success("Added to wishlist")
    return true
  } catch (e) {
    toast.error("Could not add to wishlist")
    return false
  }
}

export async function removeFromWishlist(courseId, token) {
  try {
    const res = await apiConnector(
      "POST",
      REMOVE_WISHLIST_API,
      { courseId },
      { Authorization: `Bearer ${token}` }
    )
    if (!res?.data?.success) throw new Error(res?.data?.message)
    toast.success("Removed from wishlist")
    return true
  } catch (e) {
    toast.error("Could not remove from wishlist")
    return false
  }
}

