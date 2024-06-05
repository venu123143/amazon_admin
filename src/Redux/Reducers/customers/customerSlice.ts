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

export const blockOrUnBlock = createAsyncThunk('authSlice/blockOrUnBlock', async (data: { isBlocked: boolean, userId: string }, thunkAPI) => {
    try {
        const res = await customerService.blockOrUnBlock(data?.isBlocked, data?.userId)
        return res

    } catch (error: any) {
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
    reducers: {
        toggleBlockUser: (state, action) => {
            state.customers[action.payload.index].isBlocked = action.payload.value
        }
    },
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

        builder.addCase(blockOrUnBlock.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(blockOrUnBlock.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            toast.success(action.payload.message, {
                position: 'top-right'
            })
        }).addCase(blockOrUnBlock.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isLoading = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
    }
})

export const { toggleBlockUser } = customerSlice.actions

export default customerSlice.reducer