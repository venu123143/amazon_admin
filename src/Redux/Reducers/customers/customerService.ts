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

const blockOrUnBlock = async (isBlocked: boolean, userId: string) => {
    const res = await axios.put(`${base_url}/users/block-unBlock/${userId}`, { isBlocked }, { withCredentials: true })
    return res.data
}
const customerService = {
    getUsers,
    deleteUser,
    blockOrUnBlock
}

export default customerService