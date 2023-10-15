import axios from "axios";
import { Category, base_url } from "../../../utils/base_url";

const getBlogCat = async () => {
    const res = await axios.get(`${base_url}/blogcategory/`, { withCredentials: true })
    return res.data
}
const createBlogCat = async (data: Category) => {
    const res = await axios.post(`${base_url}/blogcategory/`, data, { withCredentials: true })
    return res.data
}
const deleteBlogCat = async (id: string) => {
    const res = await axios.delete(`${base_url}/blogcategory/${id}`, { withCredentials: true })
    return res.data
}
const editBlogCat = async (id: string, data: Category) => {
    const res = await axios.put(`${base_url}/blogcategory/${id}`, data, { withCredentials: true })
    return res.data
}

const BlogCatService = {
    getBlogCat,
    createBlogCat,
    deleteBlogCat,
    editBlogCat
}

export default BlogCatService