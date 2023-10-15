import React, { CSSProperties } from 'react'
import CustomInput from '../../components/CustomInput'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { AppDispatch, RootState } from '../../Redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { SyncLoader } from 'react-spinners'
import { createCategory } from '../../Redux/Reducers/pcategory/pcategorySlice'

let CatSchema = object({
    title: string().required('Title is Required'),

})

const AddProdCategory = () => {
    const dispatch: AppDispatch = useDispatch()
    const { isLoading } = useSelector((state: RootState) => state.pcategory)
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
            title: ''
        },
        validationSchema: CatSchema,
        onSubmit: values => {
            dispatch(createCategory(values))
            formik.resetForm()

        }
    })
    return (
        <div>
            <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Add Product Category </h3>
            <div>
                <form action="" method="post" className='space-y-3' onSubmit={formik.handleSubmit}>
                    <CustomInput value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")} name="title" type="text" placeholder="Add Product Category" className="AddProdCategory uppercase" id="AddProdCategory" />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 text-[14px] ">{formik.errors.title}</div>
                    ) : null}

                    <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
                        Add Category
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

export default AddProdCategory