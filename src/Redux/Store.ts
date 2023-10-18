import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducers/auth/AuthSlice"
import customerReducer from "./Reducers/customers/customerSlice"
import productReducer from "./Reducers/product/productSlice"
import brandReducer from "./Reducers/brand/brandSlice"
import PCategoryReduer from "./Reducers/pcategory/pcategorySlice"
import colorReducer from "./Reducers/color/colorSlice"
import blogCateReducer from "./Reducers/blogCategory/blogCatSlice"
import blogReducer from "./Reducers/blogs/blogSlice"
import orderReducer from "./Reducers/orders/orderSlice"
import EnqReducer from "./Reducers/enq/enqSlice"
import CouponReducer from "./Reducers/coupons/CouponSlice"

export const Store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        pcategory: PCategoryReduer,
        color: colorReducer,
        blogCat: blogCateReducer,
        blogs: blogReducer,
        ord: orderReducer,
        enq: EnqReducer,
        coupon: CouponReducer
    }

})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch