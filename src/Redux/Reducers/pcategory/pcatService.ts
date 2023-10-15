import axios from "axios";
import { Category, base_url } from "../../../utils/base_url";

const getProductCategories = async () => {
    const res = await axios.get(`${base_url}/category/`, { withCredentials: true })
    return res.data
}

const createPCatService = async (data: Category) => {
    const res = await axios.post(`${base_url}/category/`, data, { withCredentials: true })
    return res.data
}
const deletePCategory = async (id: string) => {
    const res = await axios.delete(`${base_url}/category/${id}`, { withCredentials: true })
    return res.data
}
const editPCat = async (id: string, data: Category) => {
    const res = await axios.put(`${base_url}/category/${id}`, data, { withCredentials: true })
    return res.data
}
const prodCategoryService = {
    getProductCategories,
    createPCatService,
    deletePCategory,
    editPCat
}

export default prodCategoryService