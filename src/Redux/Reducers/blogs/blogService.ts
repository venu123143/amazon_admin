import axios from "axios";
import { base_url } from "../../../utils/base_url";

const getBlogs = async () => {
    const res = await axios.get(`${base_url}/blog/`)
    return res.data
}
const createBlog = async (data: FormData) => {
    const res = await axios.post(`${base_url}/blog/new`, data, { withCredentials: true })
    return res.data
}
const deleteBlog = async (id: string) => {
    const res = await axios.delete(`${base_url}/blog/${id}`, { withCredentials: true })
    return res.data
}
const editBlog = async (id: string, data: FormData) => {
    const res = await axios.put(`${base_url}/blog/${id}`, data, { withCredentials: true })
    return res.data
}

const BlogService = {
    getBlogs,
    createBlog,
    deleteBlog,
    editBlog
}

export default BlogService