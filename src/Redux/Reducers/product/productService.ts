import axios from "axios";
import { base_url } from "../../../utils/base_url";

const getProducts = async () => {
    const res = await axios.get(`${base_url}/product/`)
    return res.data
}

const create = async (data: FormData) => {
    const res = await axios.post(`${base_url}/product/`, data, { withCredentials: true })
    return res.data
}
const deleteProd = async (id: string) => {
    const res = await axios.delete(`${base_url}/product/${id}`, { withCredentials: true })
    return res.data
}
const editPrpd = async (id: string, data: FormData) => {
    console.log(id, data);

    const res = await axios.put(`${base_url}/product/${id}`, data, { withCredentials: true })
    return res.data
}
const productService = {
    getProducts,
    create,
    deleteProd,
    editPrpd
}

export default productService