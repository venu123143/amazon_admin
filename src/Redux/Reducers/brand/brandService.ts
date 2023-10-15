import axios from "axios";
import { Category, base_url } from "../../../utils/base_url";

const getBrands = async () => {
    const res = await axios.get(`${base_url}/brand/`, { withCredentials: true })
    return res.data
}

const createBrand = async (data: Category) => {
    const res = await axios.post(`${base_url}/brand/`, data, { withCredentials: true })
    return res.data
}
const deleteBrand = async (id: string) => {
    const res = await axios.delete(`${base_url}/brand/${id}`, { withCredentials: true })
    return res.data
}
const editBrand= async (id: string, data: Category) => {
    const res = await axios.put(`${base_url}/brand/${id}`, data, { withCredentials: true })
    return res.data
}

const brandService = {
    getBrands,
    createBrand,
    deleteBrand,
    editBrand
}

export default brandService