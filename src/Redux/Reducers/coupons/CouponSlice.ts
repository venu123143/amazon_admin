import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import couponService from "./CouponService";
export interface CouponType {
    name: string;
    expiry: Date | null;
    discount: number;
}

export const getAllcoupons = createAsyncThunk('couponSlice/getAllcoupons', async (_, thunkAPI) => {
    try {

        const coupons = await couponService.getcoupons()
        return coupons
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const createcoupon = createAsyncThunk('couponSlice/createcoupon', async (data: CouponType, thunkAPI) => {
    try {
        const couponCate = await couponService.createcoupon(data)
        return couponCate

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const deletecoupon = createAsyncThunk('couponSlice/deletecoupon', async (id: string, thunkAPI) => {
    try {
        const couponDel = await couponService.deletecoupon(id)
        return couponDel

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const editcoupon = createAsyncThunk('couponSlice/editcoupon', async (data: { id: string, data: CouponType }, thunkAPI) => {
    try {
        const couponDel = await couponService.editcoupon(data.id, data.data)
        return couponDel

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})


interface couponState {
    coupons: any[]; // You can replace 'any' with a specific type for customers
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    modal: boolean;
}

const initialState: couponState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    modal: false,
}

const couponSlice = createSlice({
    name: 'couponSlice',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllcoupons.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllcoupons.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.coupons = action.payload
        }).addCase(getAllcoupons.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
        })
        builder.addCase(createcoupon.pending, (state) => {
            state.isLoading = true
        }).addCase(createcoupon.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully created the coupon', {
                position: 'top-right'
            })
        }).addCase(createcoupon.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(deletecoupon.pending, (state) => {
            state.isLoading = true
        }).addCase(deletecoupon.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully deleted the coupon', {
                position: 'top-right'
            })
        }).addCase(deletecoupon.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(editcoupon.pending, (state) => {
            state.isLoading = true
        }).addCase(editcoupon.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.modal = false
            toast.success('sucessfully updated the coupon', {
                position: 'top-right'
            })
        }).addCase(editcoupon.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.modal = false
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })

    }
})

export const { openModal } = couponSlice.actions

export default couponSlice.reducer