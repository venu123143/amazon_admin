import axios from "axios";
import { base_url } from "../../../utils/base_url";
import { CouponType } from "./CouponSlice";


const getcoupons = async () => {
    const res = await axios.get(`${base_url}/coupon/`, { withCredentials: true })
    return res.data
}
const createcoupon = async (data: CouponType) => {
    const res = await axios.post(`${base_url}/coupon/`, data, { withCredentials: true })
    return res.data
}
const deletecoupon = async (id: string) => {
    const res = await axios.delete(`${base_url}/coupon/${id}`, { withCredentials: true })
    return res.data
}
const editcoupon = async (id: string, data: CouponType) => {
    const res = await axios.put(`${base_url}/coupon/${id}`, data, { withCredentials: true })
    return res.data
}

const couponService = {
    getcoupons,
    createcoupon,
    deletecoupon,
    editcoupon
}

export default couponService