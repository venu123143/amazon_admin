import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import ColorService from "./colorService";
import { Category } from "../../../utils/base_url";

export const getColors = createAsyncThunk('pCategorySlice/getColors', async (_, thunkAPI) => {
    try {
        const color = await ColorService.getColor()
        return color

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const createColor = createAsyncThunk('getColorsSlice/createColor', async (data: Category, thunkAPI) => {
    try {
        const color = await ColorService.createColor(data)
        return color

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const deleteColor = createAsyncThunk('getColorsSlice/deleteColor', async (id: string, thunkAPI) => {
    try {
        const color = await ColorService.deleteColor(id)
        return color

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})
export const editColor = createAsyncThunk('getColorsSlice/editColor', async (data: { id: string, data: Category }, thunkAPI) => {
    try {
        const color = await ColorService.editColor(data.id, data.data)
        return color

    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface ColorState {
    colors: any[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
}

const initialState: ColorState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

const getColorsSlice = createSlice({
    name: 'getColorsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getColors.pending, (state) => {
            state.isLoading = true
        }).addCase(getColors.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.colors = action.payload
        }).addCase(getColors.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(createColor.pending, (state) => {
            state.isLoading = true
        }).addCase(createColor.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully created the color', {
                position: 'top-right'
            })
        }).addCase(createColor.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(deleteColor.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteColor.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully deleted the color', {
                position: 'top-right'
            })
        }).addCase(deleteColor.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(editColor.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(editColor.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success('sucessfully deleted the color', {
                position: 'top-right'
            })
        }).addCase(editColor.rejected, (state, action: PayloadAction<any>) => {
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

export const { } = getColorsSlice.actions

export default getColorsSlice.reducer