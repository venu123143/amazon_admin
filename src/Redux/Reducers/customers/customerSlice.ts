import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import customerService from "./customerService"
import { toast } from "react-toastify";


export const getAllUsers = createAsyncThunk('customerSlice/getAllUsers', async (_, thunkAPI) => {
    try {
        const users = await customerService.getUsers()
        return users
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const deleteUser = createAsyncThunk('customerSlice/deleteUser', async (id: string, thunkAPI) => {
    try {
        const users = await customerService.deleteUser(id)
        return users
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface CustomerState {
    customers: any[]; // You can replace 'any' with a specific type for customers
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: CustomerState = {
    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllUsers.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.customers = action.payload

        }).addCase(getAllUsers.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteUser.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.error("sucessfully deleted the user", {
                position: 'top-right'
            })

        }).addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })

    }
})

export const { } = customerSlice.actions

export default customerSlice.reducer