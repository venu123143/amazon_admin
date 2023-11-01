import axios from "axios";
import { base_url } from "../../../utils/base_url";

const getOrders = async () => {
    const res = await axios.get(`${base_url}/users/allorders`, { withCredentials: true })
    return res.data
}
const deleteOrder = async (id: string) => {
    const res = await axios.delete(`${base_url}/users/deleteorder/${id}`, { withCredentials: true })
    return res.data
}

const OrderService = {
    getOrders,
    deleteOrder
}

export default OrderService