import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import authService from "./AuthService"
import { toast } from "react-toastify";

export interface UserState {
    _id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email: string | null;
    mobile?: string | null;
    password?: string | null;
    token?: string | null;
}

interface AppState {
    user: UserState | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const userDefaultState: UserState = {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
    mobile: null,
    token: null,
};

const initialState: AppState = {
    user: userDefaultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const login = createAsyncThunk('authSlice/admin-login', async (user: UserState, thunkAPI) => {
    try {
        const res = await authService.login(user)
        return res

    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})


const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.user
            state.message = action.payload.message
            toast.success(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.user = null
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
    }

})

export const { } = authSlice.actions

export default authSlice.reducer