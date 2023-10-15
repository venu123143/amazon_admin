import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import EnqService from "./enqService";
import { toast } from "react-toastify";

export const getEnquries = createAsyncThunk('pCategorySlice/getEnquirySlice', async (_, thunkAPI) => {
    try {
        const color = await EnqService.getEnq()
        return color

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const delEnquiry = createAsyncThunk('pCategorySlice/delEnquiry', async (id: string, thunkAPI) => {
    try {
        const color = await EnqService.delEnq(id)
        return color

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface ColorState {
    enq: any[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: ColorState = {
    enq: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

const getEnquirySlice = createSlice({
    name: 'getEnquirySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEnquries.pending, (state) => {
            state.isLoading = true
        }).addCase(getEnquries.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.enq = action.payload
        }).addCase(getEnquries.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(delEnquiry.pending, (state) => {
            state.isLoading = true
        }).addCase(delEnquiry.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success("sucessfully deleted the enquiry", {
                position: 'top-right'
            })
        }).addCase(delEnquiry.rejected, (state, action: PayloadAction<any>) => {
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

export const { } = getEnquirySlice.actions

export default getEnquirySlice.reducer