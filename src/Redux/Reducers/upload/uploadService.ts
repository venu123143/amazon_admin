import { base_url } from "../../../utils/base_url";
import axios from "axios"

const uploadImg = async (data: FormData) => {
    const res = await axios.post(`${base_url}/product/upload`, data, { withCredentials: true })
    return res.data
}

const uploadService = {
    uploadImg
}

export default uploadService