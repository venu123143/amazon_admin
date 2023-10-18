import React, { CSSProperties, useCallback, useEffect } from 'react'
import CustomInput from './CustomInput'
import { RxCross2 } from 'react-icons/rx'
import { date, number, object, string } from 'yup'
import { useFormik } from 'formik'
import { AppDispatch, RootState } from '../Redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { editcoupon, openModal } from '../Redux/Reducers/coupons/CouponSlice'
import { SyncLoader } from 'react-spinners'
import DatePicker from 'react-datepicker'
import { BsCalendarDay } from 'react-icons/bs'



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


const CouponModel = ({ coupon }: any) => {
    const dispatch: AppDispatch = useDispatch()
    const { modal, isLoading } = useSelector((state: RootState) => state.coupon)

    console.log(coupon, " coupon");
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
    const formik = useFormik({
        initialValues: {
            name: '',
            discount: 1,
            expiry: coupon?.expiry ? new Date(coupon.expiry) : null,
        },
        validationSchema: couponSchema,
        onSubmit: data => {
            dispatch(editcoupon({ id: coupon._id, data }))
            formik.resetForm()
        }
    })


    const handleDateChange = useCallback((date: Date) => {
        formik.setFieldValue("expiry", date);
    }, [formik]);

    useEffect(() => {
        if (coupon) {
            formik.setValues({
                name: coupon?.name || '',
                discount: coupon?.discount || 1,
                expiry: new Date(coupon?.expiry),
            });
        }
    }, [coupon]);

    return (
        <div>
            <div className={`absolute top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2 w-full z-50 transition-all ease-in ${modal === true ? "scale-100 duration-200" : "scale-0 duration-200"}  p-4 bg-white overflow-x-hidden overflow-y-auto rounded-md min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] `}
                id="name">
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                    id="exampleModalLgLabel">
                    Edit Coupon
                </h5>
                <button type="button" onClick={() => dispatch(openModal(false))} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <RxCross2 className="" size={20} />
                    <span className="sr-only">Close modal</span>
                </button>

                <form className="p-4 space-y-3" onSubmit={formik.handleSubmit}>
                    {/* coupon */}
                    <CustomInput value={formik.values.name} onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} name="name" type="text" placeholder="Enter coupon Name" className="Addcoupon uppercase" id="Addcoupon" />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-[14px] ">{formik.errors.name}</div>
                    ) : null}
                    {/* expiry */}

                    <label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-900">
                        Expiry Date <span className="text-red-500 text-lg">*</span>
                    </label>
                    <div className="flex items-center w-full">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <BsCalendarDay className="absolute left-3 top-3 z-10 w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <DatePicker id='expiry' dateFormat="dd/MM/yyyy" onSelect={handleDateChange} onBlur={formik.handleBlur("expiry")} onChange={handleDateChange} selected={formik.values.expiry}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" />
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


                    <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
                        Edit coupon
                    </button>
                </form>
            </div>
            <div onClick={() => dispatch(openModal(false))} className={`${modal === true ? "block delay-75" : "hidden"} transition-all ease-in absolute top-0 left-0 z-0 bg-black opacity-50 w-full h-screen`}>
            </div>
            <div className={`${isLoading === true ? "block bg-black opacity-50 absolute top-0 left-0  z-20 w-full h-screen" : "hidden"}`}>
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

export default React.memo(CouponModel);