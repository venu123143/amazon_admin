import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import brandService from "./brandService"
import { toast } from "react-toastify";
import { Category } from "../../../utils/base_url";


export const getAllBrands = createAsyncThunk('brandSlice/getAllBrands', async (_, thunkAPI) => {
    try {

        const brands = await brandService.getBrands()
        return brands
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const createBrand = createAsyncThunk('brandSlice/createBrand', async (data: Category, thunkAPI) => {
    try {
        const blogCate = await brandService.createBrand(data)
        return blogCate

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const deleteBrand = createAsyncThunk('brandSlice/deleteBrand', async (id: string, thunkAPI) => {
    try {
        const blogDel = await brandService.deleteBrand(id)
        return blogDel

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const editBrand = createAsyncThunk('brandSlice/editBrand', async (data: { id: string, data: Category }, thunkAPI) => {
    try {
        const blogDel = await brandService.editBrand(data.id, data.data)
        return blogDel

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface BrandState {
    brands: any[]; // You can replace 'any' with a specific type for customers
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: BrandState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

const brandSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBrands.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllBrands.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.brands = action.payload
        }).addCase(getAllBrands.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(createBrand.pending, (state) => {
            state.isLoading = true
        }).addCase(createBrand.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully created the brand', {
                position: 'top-right'
            })
        }).addCase(createBrand.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(deleteBrand.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteBrand.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully deleted the brand', {
                position: 'top-right'
            })
        }).addCase(deleteBrand.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(editBrand.pending, (state) => {
            state.isLoading = true
        }).addCase(editBrand.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully updated the brand', {
                position: 'top-right'
            })
        }).addCase(editBrand.rejected, (state, action: PayloadAction<any>) => {
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

export const { } = brandSlice.actions

export default brandSlice.reducer