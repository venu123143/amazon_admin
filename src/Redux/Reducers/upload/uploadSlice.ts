import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import uploadService from "./uploadService"
import { toast } from "react-toastify";


export const uploadImages = createAsyncThunk('uploadSlice/uploadImages', async (data: FormData, thunkAPI) => {
    try {
        const prod = await uploadService.uploadImg(data)
        return prod
    } catch (error: any) {
        if (error?.response?.data.title === 'UNAUTHORIZED_ERROR') {
            localStorage.removeItem("user")
        }
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface ImageState {
    images: any[]; // You can replace 'any' with a specific type for customers
    isError: boolean;
    uploadLoading: boolean;
    isSuccess: boolean;
    message: string;
    modal: boolean;
}

const initialState: ImageState = {
    images: [],
    isError: false,
    uploadLoading: false,
    isSuccess: false,
    message: "",
    modal: false,
}

const uploadSlice = createSlice({
    name: 'uploadSlice',
    initialState,
    reducers: {
        resetImages: (state) => {
            state.images = []
        },

    },
    extraReducers: (builder) => {
        builder.addCase(uploadImages.pending, (state) => {
            state.uploadLoading = true
        }).addCase(uploadImages.fulfilled, (state, action: PayloadAction<any>) => {
            state.uploadLoading = false
            state.isSuccess = true
            state.isError = false
            state.images = action.payload.images
        }).addCase(uploadImages.rejected, (state, action: PayloadAction<any>) => {
            state.uploadLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload,
                toast.error(state.message, { position: 'top-right' })
        })
    }
})

export const { resetImages } = uploadSlice.actions

export default uploadSlice.reducer