import { createSlice, createAsyncThunk, PayloadAction, Slice } from "@reduxjs/toolkit"
import authService from "./AuthService"
import { toast } from "react-toastify";
const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null

export interface UserState {
    _id?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    email: string | null;
    mobile?: string | null;
    password?: string | null;
    refreshToken?: string | null;
    role?: string | null;
    isBlocked?: string | null;
}

interface AppState {
    user: UserState | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: AppState = {
    user: getUserFromLocalStorage,
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
export const logout = createAsyncThunk('authSlice/admin-logout', async (_, thunkAPI) => {
    try {
        const res = await authService.logout()
        return res

    } catch (error: any) {
        localStorage.removeItem("user")
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const forgotPassword = createAsyncThunk('authSlice/forgotPassword', async (email: string, thunkAPI) => {
    try {
        const res = await authService.forgot(email)
        return res
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const resetPassword = createAsyncThunk('authSlice/resetPassword', async (data: { password: string, token: string }, thunkAPI) => {
    try {
        const res = await authService.reset(data?.token, data?.password)
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
            state.message = action.payload?.message
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
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(logout.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = null
            state.message = action.payload.message
            toast.success(state.message, {
                position: 'top-right'
            })
        }).addCase(logout.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })

        builder.addCase(forgotPassword.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(forgotPassword.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            toast.success("Sucessfully sent An Email", {
                position: 'top-right'
            })
        }).addCase(forgotPassword.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })

        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(resetPassword.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            toast.success("Password reset successful", {
                position: 'top-right'
            })
        }).addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
    }

}) as Slice<AppState, {}, 'authSlice'>


export const { } = authSlice.actions

export default authSlice.reducer