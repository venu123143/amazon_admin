import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import OrderService from "./orderService";
import { toast } from "react-toastify";

export const getAllOrders = createAsyncThunk('orderSlice/getAllOrders', async (_, thunkAPI) => {
    try {
        const orders = await OrderService.getOrders()
        console.log(orders);
        
        return orders

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const deleteOrder = createAsyncThunk('orderSlice/deleteOrder', async (id: string, thunkAPI) => {
    try {
        const orders = await OrderService.deleteOrder(id)
        return orders

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface OrdersState {
    orders: any[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: OrdersState = {
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}
const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllOrders.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.orders = action.payload
        }).addCase(getAllOrders.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(deleteOrder.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(deleteOrder.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success("Order Deleted Sucessfully", {
                position: 'top-right'
            })
        }).addCase(deleteOrder.rejected, (state, action: PayloadAction<any>) => {
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

export const { } = orderSlice.actions
export default orderSlice.reducer