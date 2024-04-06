import React, { Suspense } from 'react';
import './css/App.css'
import 'react-toastify/dist/ReactToastify.css';

// toast and routes.
import { ToastContainer } from "react-toastify"
import { Routes, Route } from "react-router-dom"

import Login from './pages/login/Login'
import ResetPassword from './pages/login/ResetPassword'
import MainLayout from './pages/Dashboard/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import LoginWithOtp from './pages/login/LoginWithOtp';
import SignUpPage from './pages/login/Register';
import LoadingComp from './helpers/LoadingComp';

const Blogs = React.lazy(() => import('./pages/blogs/Blogs'));
const AddBlog = React.lazy(() => import('./pages/blogs/AddBlog'));
const AddProduct = React.lazy(() => import('./pages/product/AddProduct'));
const AllProducts = React.lazy(() => import('./pages/product/AllProducts'));
const BlogCatList = React.lazy(() => import('./pages/blogs/BlogCatList'));
const ColorList = React.lazy(() => import('./pages/Colors/ColorList'));
const Customers = React.lazy(() => import('./pages/product/Customers'));
const Orders = React.lazy(() => import('./pages/product/Orders'));
const CategoryList = React.lazy(() => import('./pages/product/CategoryList'));
const BrandList = React.lazy(() => import('./pages/Brands/BrandList'));
const AddBlogCat = React.lazy(() => import('./pages/blogs/AddBlogCat'));
const AddColor = React.lazy(() => import('./pages/Colors/AddColor'));
const AddProdCategory = React.lazy(() => import('./pages/product/AddCategory'));
const AddBrand = React.lazy(() => import('./pages/Brands/AddBrand'));
const Enquries = React.lazy(() => import('./pages/Dashboard/Enquries'));
const Errorpage = React.lazy(() => import('./components/ErrorPage'));
const AddCoupon = React.lazy(() => import('./pages/coupons/AddCoupon'));
const CouponList = React.lazy(() => import('./pages/coupons/CouponList'));

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Suspense fallback={<LoadingComp />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/reset/:id" element={<ResetPassword />} />
          <Route path="/otplogin" element={<LoginWithOtp />} />
          <Route path='/admin' element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/blog-list" element={<Blogs />} />
            <Route path="/admin/blog-category-list" element={<BlogCatList />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/colorlist" element={<ColorList />} />
            <Route path="/admin/categorylist" element={<CategoryList />} />
            <Route path="/admin/brandlist" element={<BrandList />} />
            <Route path="/admin/productlist" element={<AllProducts />} />
            <Route path="/admin/blog" element={<AddBlog />} />
            <Route path="/admin/blog-category" element={<AddBlogCat />} />
            <Route path="/admin/product" element={<AddProduct />} />
            <Route path="/admin/color" element={<AddColor />} />
            <Route path="/admin/category" element={<AddProdCategory />} />
            <Route path="/admin/brand" element={<AddBrand />} />
            <Route path="/admin/enquiries" element={<Enquries />} />
            <Route path="/admin/coupons" element={<CouponList />} />
            <Route path="/admin/create-coupon" element={<AddCoupon />} />
          </Route>
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
