
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
import Blogs from './pages/blogs/Blogs';
import AddBlog from './pages/blogs/AddBlog';
import AddProduct from './pages/product/AddProduct';
import AllProducts from './pages/product/AllProducts';
import BlogCatList from './pages/blogs/BlogCatList';
import ColorList from './pages/Colors/ColorList';
import Customers from './pages/product/Customers';
import Orders from './pages/product/Orders';
import CategoryList from './pages/product/CategoryList';
import BrandList from './pages/Brands/BrandList';
import AddBlogCat from './pages/blogs/AddBlogCat';
import AddColor from './pages/Colors/AddColor';
import AddProdCategory from './pages/product/AddCategory';
import AddBrand from './pages/Brands/AddBrand';
import Enquries from './pages/Dashboard/Enquries';
import Errorpage from './components/ErrorPage';
import AddCoupon from './pages/coupons/AddCoupon';
import CouponList from './pages/coupons/CouponList';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/reset" element={<ResetPassword />} />
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
    </>
  )
}

export default App
