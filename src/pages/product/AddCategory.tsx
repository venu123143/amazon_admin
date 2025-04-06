import CustomInput from '../../components/CustomInput'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { AppDispatch, RootState } from '../../Redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { SyncLoader } from 'react-spinners'
import { createCategory } from '../../Redux/Reducers/pcategory/pcategorySlice'
import { useTheme } from "../../context/themecontent"

let CatSchema = object({
    title: string().required('Title is Required'),

})

const AddProdCategory = () => {
    const dispatch: AppDispatch = useDispatch()
    const { isLoading } = useSelector((state: RootState) => state.pcategory)
    const { isDarkMode } = useTheme()
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
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <h3 className="font-medium text-2xl text-gray-900 dark:text-white mb-6">Add Product Category</h3>
            <div>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        value={formik.values.title}
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        name="title"
                        type="text"
                        placeholder="Product Category"
                        classname="uppercase"
                        id="AddProdCategory"
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 text-sm -mt-4">{formik.errors.title}</div>
                    ) : null}

                    <button
                        type="submit"
                        className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        Add Category
                    </button>
                </form>
            </div>

            {/* Loading overlay */}
            <div
                className={`${isLoading ? "block" : "hidden"
                    } fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center`}
            >
                <SyncLoader color={isDarkMode ? "#3b82f6" : "#2563eb"} loading={isLoading} />
            </div>
        </div>
    )
}

export default AddProdCategory