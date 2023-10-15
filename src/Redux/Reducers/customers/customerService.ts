import axios from "axios";
import { base_url } from "../../../utils/base_url";

const getUsers = async () => {
    const res = await axios.get(`${base_url}/users/allusers`)
    return res.data
}
const deleteUser = async (id: string) => {
    const res = await axios.delete(`${base_url}/users/${id}`, { withCredentials: true })
    return res
}

const customerService = {
    getUsers,
    deleteUser,
    
}

export default customerService