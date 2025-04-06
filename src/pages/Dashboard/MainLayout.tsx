import React, { useState, CSSProperties } from 'react';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUpload, AiOutlineBgColors, AiOutlineQuestionCircle, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { BsPerson, BsBagCheck, BsSearch, BsTicket } from "react-icons/bs"
import { BiCategory, BiLogoBlogger, BiCategoryAlt } from "react-icons/bi"
import { LiaCartPlusSolid } from "react-icons/lia"
import { SiBrandfolder } from "react-icons/si"
import { FiList } from "react-icons/fi"
import { FaBlogger, FaListOl } from "react-icons/fa"
import { IoColorPaletteOutline } from "react-icons/io5"
import { GiIndiaGate } from "react-icons/gi"
import { IoIosNotifications, IoMdCreate } from "react-icons/io"
import profile from "../../assets/profile.jpg"
import { Layout, Menu, Button } from 'antd';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Reducers/auth/AuthSlice';
import { AppDispatch, RootState } from '../../Redux/Store';
import { SyncLoader } from 'react-spinners';
import { useTheme } from "../../context/themecontent"

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
    const navigagte = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false);
    const [dropdown, setDropDown] = useState(false);
    const { isDarkMode } = useTheme();

    const pathName = window.location.pathname
    const incluProduct = pathName.includes('product');
    const incluBrand = pathName.includes('brand');
    const incluCategory = pathName.includes('/admin/category');
    const incluColor = pathName.includes('color');
    const incluBlog = pathName.includes('blog');

    const colors = ["red", "blue", "green", "yellow", 'pink'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    const { isLoading, user } = useSelector((state: RootState) => state.auth)
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        width: 380,
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: 'translateX(-50%, -50%)'
    };
    const handleSignOut = () => {
        dispatch(logout())
    }
    return (
        <Layout className={`w-full no-scrollbar ${isDarkMode ? 'dark' : ''}`}>
            <Sider className={`h-screen overflow-y-scroll ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'}`} trigger={null} collapsible collapsed={collapsed} >
                <div className={`bg-gradient-to-l ${isDarkMode ? 'from-gray-700 to-gray-900' : 'from-red-400 to-gray-500'}`}>
                    <h2 className='text-white text-center py-3 mb-0'>
                        <span className={`${collapsed === true ? "block" : "hidden"} sm-logo font-Rubik font-bold text-[1.2rem]`}>Admin</span>
                        <span className={`${collapsed === true ? "hidden" : "block"} lg-logo font-Rubik font-bold text-[1.2rem]`}>Amazon Admin</span>
                    </h2>
                </div>
                <Menu
                    theme={isDarkMode ? "dark" : "light"}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        if (key === "signout") {
                            console.log("log signout");
                        } else {
                            navigagte(key)
                        }
                    }}
                    items={[
                        {
                            key: '/admin',
                            icon: <AiOutlineDashboard size={20} />,
                            label: 'Dashboard',
                            className: `${pathName == "/admin" ? "ant-menu-item-selected" : ""}`
                        },
                        {
                            key: 'customers',
                            icon: <BsPerson size={20} />,
                            label: 'Customers',
                            className: `${pathName === "/admin/customers" ? "ant-menu-item-selected" : ""}`
                        },
                        {
                            key: 'catalog',
                            icon: <AiOutlineUpload size={20} />,
                            label: 'Catalog',
                            className: `${incluProduct || incluBrand || incluCategory || incluColor ? "ant-menu-item-selected" : ""}`,
                            children: [
                                {
                                    key: 'product',
                                    icon: <LiaCartPlusSolid size={25} />,
                                    label: 'Add Product',
                                    className: `${pathName == "/admin/product" ? "ant-menu-item-selected" : ""}`
                                }, {
                                    key: 'productlist',
                                    icon: <AiOutlineShoppingCart size={20} />,
                                    label: 'Product List',
                                    className: `${pathName == "/admin/productlist" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder size={20} />,
                                    label: 'Brand',
                                    className: `${pathName == "/admin/brand" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'brandlist',
                                    icon: <FiList size={20} />,
                                    label: 'Brand List',
                                    className: `${pathName == "/admin/brandlist" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategory size={20} />,
                                    label: 'Category',
                                    className: `${pathName == "/admin/category" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'categorylist',
                                    icon: <FiList size={20} />,
                                    label: 'Category List',
                                    className: `${pathName == "/admin/categorylist" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'color',
                                    icon: <AiOutlineBgColors size={20} />,
                                    label: 'color',
                                    className: `${pathName == "/admin/color" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'colorlist',
                                    icon: <IoColorPaletteOutline size={20} />,
                                    label: 'color List',
                                    className: `${pathName == "/admin/colorlist" ? "ant-menu-item-selected" : ""}`
                                },
                            ]
                        },
                        {
                            key: 'orders',
                            icon: <BsBagCheck size={20} />,
                            label: 'Orders',
                            className: `${pathName == "/admin/orders" ? "ant-menu-item-selected" : ""}`
                        },
                        {
                            key: 'blogs',
                            icon: <BiLogoBlogger size={20} className={isDarkMode ? "text-white" : "text-gray-800"} />,
                            label: 'Blogs',
                            className: `${incluBlog ? "ant-menu-item-selected" : ""}`,
                            children: [
                                {
                                    key: 'blog',
                                    icon: <FaBlogger size={20} />,
                                    label: 'Add Blog',
                                    className: `${pathName == "/admin/blog" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'blog-list',
                                    icon: <FaBlogger size={20} />,
                                    label: 'Blog list',
                                    className: `${pathName == "/admin/blog-list" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'blog-category',
                                    icon: <BiCategoryAlt size={20} />,
                                    label: 'Add Blog category',
                                    className: `${pathName == "/admin/blog-category" ? "ant-menu-item-selected" : ""}`
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <FaListOl size={20} />,
                                    label: 'Blog Categ list',
                                    className: `${pathName == "/admin/blog-category-list" ? "ant-menu-item-selected" : ""}`
                                },
                            ]
                        },
                        {
                            key: 'create-coupon',
                            icon: <IoMdCreate size={20} />,
                            label: 'Create Coupon',
                            className: `${pathName == "/admin/create-coupon" ? "ant-menu-item-selected" : ""}`
                        },
                        {
                            key: 'coupons',
                            icon: <BsTicket size={20} />,
                            label: 'Coupons',
                            className: `${pathName == "/admin/coupons" ? "ant-menu-item-selected" : ""}`
                        },
                        {
                            key: 'enquiries',
                            icon: <AiOutlineQuestionCircle size={20} />,
                            label: 'Enquiries',
                            className: `${pathName == "/admin/enquiries" ? "ant-menu-item-selected" : ""}`
                        }
                    ]}
                />
            </Sider>

            <Layout className={isDarkMode ? 'dark:bg-gray-900' : 'bg-white'}>
                {/* header */}
                <Header style={{ padding: 0 }} className={`flex ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'} justify-between`}>
                    <div className='flex justify-center items-center'>
                        <Button 
                            type="text"
                            icon={collapsed ? <AiOutlineMenuUnfold size={20} /> : <AiOutlineMenuFold size={20} />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                color: isDarkMode ? '#fff' : '#000'
                            }}
                        />

                        <form className='relative w-[300px] h-fit'>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <BsSearch className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
                            </div>
                            <input 
                                type="search" 
                                id="default-search" 
                                placeholder="Search here"
                                className={`block w-full h-full p-2 pl-10 text-sm border outline-none focus:shadow-md rounded-lg ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-600' 
                                        : 'bg-gray-200 border-gray-300 text-gray-900 focus:bg-white'
                                }`}
                                required 
                            />
                        </form>
                    </div>
                    <div className='mr-5 flex items-center justify-between gap-5'>
                        <div className='country'>
                            <GiIndiaGate size={25} className={isDarkMode ? "text-white" : "text-gray-800"} />
                        </div>
                        <div className='notification relative p-1'>
                            <IoIosNotifications size={25} className={isDarkMode ? "text-white" : "text-gray-800"} />
                            <span className={`absolute top-0 right-0 text-xs ${
                                isDarkMode ? 'bg-gray-600 text-white' : 'bg-red-500 text-white'
                            } rounded-full w-4 h-4 flex items-center justify-center`}>1</span>
                        </div>
                        <div 
                            onClick={() => setDropDown(!dropdown)} 
                            className={`flex relative items-center justify-between gap-3 cursor-pointer p-3 ${
                                isDarkMode 
                                    ? 'hover:bg-gray-700' 
                                    : `hover:bg-gradient-to-r from-slate-200 ${
                                        randomColor === "red" ? "to-red-400" : 
                                        randomColor === "blue" ? "to-blue-400" : 
                                        randomColor === "green" ? "to-green-400" : 
                                        randomColor === "yellow" ? "to-yellow-400" : "to-pink-400"
                                    }`
                            }`}
                        >
                            <div className='image'>
                                <img src={profile} alt="profile" className='w-[40px] h-[40px] rounded-full' />
                            </div>
                            <div className='name leading-5'>
                                <h3 className={`text-[1rem] font-Rubik mb-0 font-[500] ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {user?.firstname} {user?.lastname}
                                </h3>
                                <span className={`mb-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {user?.email}
                                </span>
                            </div>
                            {
                                dropdown && (
                                    <div id="dropdownHover" className={`z-10 absolute right-0 top-16 w-full rounded-lg shadow ${
                                        isDarkMode ? 'bg-gray-700' : 'bg-white'
                                    }`}>
                                        <ul className={`py-2 text-sm ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-700'
                                        }`} aria-labelledby="dropdownHoverButton">
                                            <li>
                                                <Link to="/" className={`block px-4 py-2 ${
                                                    isDarkMode ? 'hover:bg-gray-600 hover:text-white' : 'hover:bg-gray-100'
                                                }`}>View Profile</Link>
                                            </li>
                                            <li>
                                                <Link to="/" className={`block px-4 py-2 ${
                                                    isDarkMode ? 'hover:bg-gray-600 hover:text-white' : 'hover:bg-gray-100'
                                                }`}>Change Settings</Link>
                                            </li>
                                            <li>
                                                <span 
                                                    onClick={handleSignOut} 
                                                    className={`block px-4 py-2 ${
                                                        isDarkMode ? 'hover:bg-gray-600 hover:text-white' : 'hover:bg-gray-100'
                                                    } cursor-pointer`}
                                                >
                                                    Sign out
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Header>
                {/* content */}
                <Content className={`p-5 ${isDarkMode ? 'dark:bg-gray-900' : 'bg-gray-50'}`} style={{ minHeight: 280, overflowY: 'auto' }}>
                    <Outlet />
                </Content>
                <div className={`${isLoading === true ? "block bg-black opacity-50 absolute top-0 left-0 w-full h-screen" : "hidden"}`}>
                    <SyncLoader
                        color="#361AE3"
                        loading={isLoading}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </Layout>
        </Layout>
    );
};

export default MainLayout;