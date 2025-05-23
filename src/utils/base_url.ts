// export const base_url = "http://localhost:5000/api"
// export const base_url=  "https://amazonserver.toystack.dev/api"
// export const base_url=  "https://amazonserver-r83q.onrender.com/api"
export const base_url = import.meta.env.VITE_API_BASE_URL

export interface Category {
    title: string;
}

export interface Order {
    _id: string;
    products: Product[];
    paymentIntent: PaymentIntent;
    orderStatus: string;
    paymentMethod: string;
    orderBy: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Product {
    count: number;
    color: string;
    _id: string;
}

export interface PaymentIntent {
    order_id: string;
    method: string;
    amount: number;
    created: number;
    currency: string;
}

export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    isBlocked: boolean;
    cart: any[]; 
    wishlist: any[]; 
    createdAt: string;
    updatedAt: string;
    refreshToken: string;
    __v: number;
}