import { CSSProperties, useCallback, useEffect, useMemo } from "react"
import { SyncLoader } from "react-spinners"
import { useDispatch, useSelector } from "react-redux"
import { date, number, object, string } from "yup"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import CustomInput from "../../components/CustomInput"
import { AppDispatch, RootState } from "../../Redux/Store"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createcoupon } from "../../Redux/Reducers/coupons/CouponSlice"
import { BsCalendarDay } from "react-icons/bs"


let couponSchema = object({
    name: string().matches(/^\S*$/, 'Coupon name cannot contain spaces').required('name is Required'),
    expiry: date()
        .required('Expiry is Required')
        .min(new Date(), 'Expiry date must be in the future'),
    discount: number()
        .min(1, 'Discount must be between 1 and 100')
        .max(100, 'Discount must be between 1 and 100')
        .required('Discount is Required')

})

const AddCoupon = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    const { isLoading } = useSelector((state: RootState) => state.coupon)
    const { message, user, isError, isSuccess } = useSelector((state: RootState) => state.auth)


    useEffect(() => {
        if (user === null) {
            navigate('/')
        }
    }, [message, user, isError, isSuccess])

    const override: CSSProperties = useMemo(() => ({
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        width: 380,
        position: 'absolute',
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)',
    }), []);

    const initialValues = useMemo(() => ({
        name: '',
        expiry: null,
        discount: 1,
    }), []);

    const formik = useFormik({
        initialValues,
        validationSchema: couponSchema,
        onSubmit: values => {
            dispatch(createcoupon(values))
            formik.resetForm()
        }
    })
    const handleDateChange = useCallback((date: Date) => {
        formik.setFieldValue("expiry", date);
    }, [formik]);


    return (
        <div>
            <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Add coupon</h3>
            <div>
                <form action="" method="post" className='space-y-3' onSubmit={formik.handleSubmit}>
                    {/* coupon */}
                    <CustomInput value={formik.values.name} onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} name="name" type="text" placeholder="Enter coupon Name" className="Addcoupon uppercase" id="Addcoupon" />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-[14px] ">{formik.errors.name}</div>
                    ) : null}
                    {/* expiry */}
                    <div className="flex items-center w-full">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <BsCalendarDay className="absolute left-3 top-3 z-10 w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <DatePicker dateFormat="dd/MM/yyyy" onSelect={handleDateChange} onBlur={formik.handleBlur("expiry")} onChange={handleDateChange} selected={formik.values.expiry}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                            />
                        </div>
                    </div>
                    {formik.touched.expiry && formik.errors.expiry ? (
                        <div className="text-red-500 text-[14px] ">{formik.errors.expiry}</div>
                    ) : null}
                    {/* discount percentage */}
                    <CustomInput value={formik.values.discount} onChange={formik.handleChange("discount")} onBlur={formik.handleBlur("discount")} name="discount" type="text" placeholder="discount percentage (max-100)" className="discount uppercase" id="discount" />
                    {formik.touched.discount && formik.errors.discount ? (
                        <div className="text-red-500 text-[14px] ">{formik.errors.discount}</div>
                    ) : null}

                    <button type="submit" className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
                        Add coupon
                    </button>

                </form>
            </div>
            <div className={`${isLoading === true ? "block bg-black opacity-50 absolute top-0 left-0 w-full h-screen" : "hidden"}`}>
                <SyncLoader
                    color="#361AE3"
                    loading={isLoading}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />

            </div>

        </div>
    )
}

export default AddCoupon