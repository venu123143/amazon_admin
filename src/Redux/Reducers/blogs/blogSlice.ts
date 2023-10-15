import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import blogService from "./blogService"
import { toast } from "react-toastify";


export const getAllBlogs = createAsyncThunk('blogSlice/getAllBlogs', async (_, thunkAPI) => {
    try {
        const blogs = await blogService.getBlogs()
        return blogs

    } catch (error: any) {
        console.log(error);

        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const createBlog = createAsyncThunk('blogSlice/createBlog', async (data: FormData, thunkAPI) => {
    try {
        const blog = await blogService.createBlog(data)
        return blog

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const deleteBlog = createAsyncThunk('blogSlice/deleteBlog', async (id: string, thunkAPI) => {
    try {
        const blog = await blogService.deleteBlog(id)
        return blog

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const editBlog = createAsyncThunk('blogSlice/editBlog', async (data: { id: string, data: FormData }, thunkAPI) => {
    try {
        const blog = await blogService.editBlog(data.id, data.data)
        return blog

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface BlogState {
    blogs: any[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    modal: boolean;
}

const initialState: BlogState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    modal: false,
}

const blogSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBlogs.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllBlogs.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.blogs = action.payload
        }).addCase(getAllBlogs.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(createBlog.pending, (state) => {
            state.isLoading = true
        }).addCase(createBlog.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully created the blog', {
                position: 'top-right'
            })
        }).addCase(createBlog.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(deleteBlog.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(deleteBlog.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully deleted the blog', {
                position: 'top-right'
            })
        }).addCase(deleteBlog.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(editBlog.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(editBlog.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.modal = false
            toast.success('sucessfully Updated the blog', {
                position: 'top-right'
            })
        }).addCase(editBlog.rejected, (state, action: PayloadAction<any>) => {
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

export const { openModal } = blogSlice.actions

export default blogSlice.reducer