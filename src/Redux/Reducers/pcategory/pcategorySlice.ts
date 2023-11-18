import prodCategoryService from "./pcatService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { Category } from "../../../utils/base_url";

export const getCategories = createAsyncThunk('pCategorySlice/getCategories', async (_, thunkAPI) => {
    try {
        const categ = await prodCategoryService.getProductCategories()
        return categ

    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const createCategory = createAsyncThunk('pCategorySlice/createCategory', async (data: Category, thunkAPI) => {
    try {
        const categ = await prodCategoryService.createPCatService(data)
        return categ

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const deleteCategory = createAsyncThunk('pCategorySlice/deleteCategory', async (id: string, thunkAPI) => {
    try {
        const categ = await prodCategoryService.deletePCategory(id)
        return categ

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const editPCategory = createAsyncThunk('getColorsSlice/editPCategory', async (data: { id: string, data: Category }, thunkAPI) => {
    try {
        const categ = await prodCategoryService.editPCat(data.id, data.data)
        return categ

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
interface PCategoryState {
    categories: any[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: PCategoryState = {
    categories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

const pCategorySlice = createSlice({
    name: 'pCategorySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        }).addCase(getCategories.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.categories = action.payload
        }).addCase(getCategories.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(createCategory.pending, (state) => {
            state.isLoading = true
        }).addCase(createCategory.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully created Product Category', {
                position: 'top-right'
            })
        }).addCase(createCategory.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
            toast.error('Error while creating Product Category', {
                position: 'top-right'
            })
        })
        builder.addCase(deleteCategory.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteCategory.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully deleted Product Category', {
                position: 'top-right'
            })
        }).addCase(deleteCategory.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(editPCategory.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(editPCategory.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully deleted Product Category', {
                position: 'top-right'
            })
        }).addCase(editPCategory.rejected, (state, action: PayloadAction<any>) => {
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

export const { } = pCategorySlice.actions

export default pCategorySlice.reducer