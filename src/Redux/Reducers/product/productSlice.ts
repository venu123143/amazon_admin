import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import productService from "./productService"
import { toast } from "react-toastify";

export interface IProductState {
    _id?: string;
    title: string;
    slug?: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    tags?: string[];
    quantity: number;
    sold?: number;
    images?: Array<any>;
    color: string[];
    seller?: any;
    ratings?: number;
    totalRating?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export const getAllProducts = createAsyncThunk('productSlice/getAllProducts', async (_, thunkAPI) => {
    try {
        const users = await productService.getProducts()
        return users
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const createProduct = createAsyncThunk('productSlice/createProduct', async (data: FormData, thunkAPI) => {
    try {
        const prod = await productService.create(data)
        return prod
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const deleteProduct = createAsyncThunk('productSlice/deleteProduct', async (id: string, thunkAPI) => {
    try {
        const prod = await productService.deleteProd(id)
        return prod
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

export const editProduct = createAsyncThunk('productSlice/editProduct', async (data: { id: string, data: FormData }, thunkAPI) => {
    try {
        const prod = await productService.editPrpd(data.id, data.data)
        return prod
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
})

interface ProductState {
    products: any[]; // You can replace 'any' with a specific type for customers
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    modal: boolean;
}

const initialState: ProductState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
    modal: false,
}

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal = action.payload
        },
      
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.products = action.payload
        }).addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.products = action.payload
            toast.success("Product is Created Sucessfully", {
                position: 'top-right'
            })
        }).addCase(createProduct.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
        }).addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            toast.success("Product is Deleted Sucessfully", {
                position: 'top-right'
            })
        }).addCase(deleteProduct.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload?.message
            toast.error(state.message, {
                position: 'top-right'
            })
        })
        builder.addCase(editProduct.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.modal = true
        }).addCase(editProduct.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.modal = false
            toast.success("Product is updated Sucessfully", {
                position: 'top-right'
            })
        }).addCase(editProduct.rejected, (state, action: PayloadAction<any>) => {
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

export const { openModal } = productSlice.actions

export default productSlice.reducer