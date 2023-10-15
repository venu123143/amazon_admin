import { base_url } from "../../../utils/base_url";
import axios from "axios"

const uploadImg = async (data: any) => { 
    const res = await axios.post(`${base_url}/category/`, data, { withCredentials: true })
    return res.data
}

const uploadService = {
    uploadImg
}

export default uploadService