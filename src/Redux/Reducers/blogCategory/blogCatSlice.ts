import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import BlogCatService from "./blogCatService";
import { Category } from "../../../utils/base_url";

export const getBlogCategories = createAsyncThunk('getBlogCatSlice/getBlogCategories', async (_, thunkAPI) => {
    try {
        const blogCate = await BlogCatService.getBlogCat()
        return blogCate

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const createBlogCategory = createAsyncThunk('getBlogCatSlice/createBlogCategory', async (data: Category, thunkAPI) => {
    try {
        const blogCate = await BlogCatService.createBlogCat(data)
        return blogCate

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const deleteBlogCategory = createAsyncThunk('getBlogCatSlice/deleteBlogCategory', async (id: string, thunkAPI) => {
    try {
        const blogCate = await BlogCatService.deleteBlogCat(id)
        return blogCate

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const editBlogCategory = createAsyncThunk('getBlogCatSlice/editBlogCategory', async (data: { id: string, data: any }, thunkAPI) => {
    try {
        const blogCate = await BlogCatService.editBlogCat(data?.id, data?.data)
        return blogCate
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface BlogCategory {
    blogCategory: any[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: BlogCategory = {
    blogCategory: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

const getBlogCatSlice = createSlice({
    name: 'getBlogCatSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBlogCategories.pending, (state) => {
            state.isLoading = true
        }).addCase(getBlogCategories.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.blogCategory = action.payload
        }).addCase(getBlogCategories.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(createBlogCategory.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(createBlogCategory.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully created the blog category', {
                position: 'top-right'
            })
        }).addCase(createBlogCategory.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(deleteBlogCategory.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(deleteBlogCategory.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully deleted the blog category', {
                position: 'top-right'
            })
        }).addCase(deleteBlogCategory.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(editBlogCategory.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        }).addCase(editBlogCategory.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully updated the blog category', {
                position: 'top-right'
            })
        }).addCase(editBlogCategory.rejected, (state, action: PayloadAction<any>) => {
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

export const { } = getBlogCatSlice.actions

export default getBlogCatSlice.reducer