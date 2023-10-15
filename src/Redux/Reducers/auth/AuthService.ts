import axios from "axios";
import { base_url } from "../../../utils/base_url";
import { UserState } from "./AuthSlice";

const login = async (userData: UserState): Promise<any> => {
    const res = await axios.post(`${base_url}/users/admin-login`, userData, { withCredentials: true })
    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data?.user))
        return res.data
    }
}

const logout = async (): Promise<any> => {
    const res = await axios.get(`${base_url}/users/logout`,{withCredentials:true})
    if (res.data) {
        localStorage.removeItem("user");
    }
    return res.data
}


const authService = {
    login,
    logout
}

export default authService