import { useEffect } from 'react'
import { object, string } from 'yup'
import CustomInput from '../../components/CustomInput'
import { useFormik } from 'formik'
import { AppDispatch, RootState } from '../../Redux/Store'
import { useDispatch, useSelector } from 'react-redux'
import { createColor } from '../../Redux/Reducers/color/colorSlice'
import { SyncLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { useTheme } from "../../context/themecontent"

const ColorSchema = object({
    title: string().required('Title is Required'),
})

const AddColor = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const { isDarkMode } = useTheme()

    const { isLoading } = useSelector((state: RootState) => state.color)
    const { message, user, isError, isSuccess } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (user === null) {
            navigate('/')
        }
    }, [message, user, isLoading, isError, isSuccess])

    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: ColorSchema,
        onSubmit: values => {
            dispatch(createColor(values))
            formik.resetForm()
        }
    })

    return (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <h3 className="font-medium text-2xl text-gray-900 dark:text-white mb-6">Add Color</h3>
            <div>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        value={formik.values.title}
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        name="title"
                        type="text"
                        placeholder="Enter Color Name"
                        classname="uppercase"
                        id="AddColor"
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-red-500 text-sm -mt-4">{formik.errors.title}</div>
                    )}

                    <button
                        type="submit"
                        className="px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 dark:from-red-600 dark:to-red-700 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        Add Color
                    </button>
                </form>
            </div>

            {/* Loading overlay */}
            <div
                className={`${isLoading ? "block" : "hidden"
                    } fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center`}
            >
                <SyncLoader
                    color={isDarkMode ? "#f87171" : "#ef4444"} // red for color section
                    loading={isLoading}
                />
            </div>
        </div>
    )
}

export default AddColor
