import axios from "axios";
import { base_url } from "../../../utils/base_url";

const getEnq = async () => {
    const res = await axios.get(`${base_url}/enq/`, { withCredentials: true })
    return res.data
}
const delEnq = async (id: string) => {
    const res = await axios.get(`${base_url}/enq/${id}`, { withCredentials: true })
    return res.data
}

const EnqService = {
    getEnq,
    delEnq,
}

export default EnqService