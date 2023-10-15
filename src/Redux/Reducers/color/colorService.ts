import axios from "axios";
import { Category, base_url } from "../../../utils/base_url";

const getColor = async () => {
    const res = await axios.get(`${base_url}/color/`, { withCredentials: true })
    return res.data
}
const createColor = async (data: Category) => {
    const res = await axios.post(`${base_url}/color/`, data, { withCredentials: true })
    return res.data
}

const deleteColor = async (id: string) => {
    const res = await axios.delete(`${base_url}/color/${id}`, { withCredentials: true })
    return res.data
}
const editColor = async (id: string, data: Category) => {
    const res = await axios.put(`${base_url}/color/${id}`, data, { withCredentials: true })
    return res.data
}

const ColorService = {
    getColor,
    createColor,
    deleteColor,
    editColor
}

export default ColorService