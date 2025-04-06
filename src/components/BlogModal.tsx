import { useState, useEffect, CSSProperties } from "react"
import { useFormik } from "formik";
import { object, string } from "yup";
import { editBlog, openModal } from "../Redux/Reducers/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Store";
import { RxCross2 } from "react-icons/rx";
import { SyncLoader } from "react-spinners";
import CustomInput from "./CustomInput";
import ReactQuill from "react-quill";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify"
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getBlogCategories } from "../Redux/Reducers/blogCategory/blogCatSlice";
import { useTheme } from './../context/themecontent'; 

let userSchema = object({
    title: string().required('Title is Required'),
    description: string().required('Description is Required'),
    category: string().required('Please Select the Category'),
});

const BlogModal = ({ prod }: any) => {
    const { isDarkMode } = useTheme();
    const dispatch: AppDispatch = useDispatch();
    const [images, setImages] = useState<any>([]);
    const { isLoading, modal } = useSelector((state: RootState) => state.blogs)
    const { blogCategory } = useSelector((state: RootState) => state.blogCat)

    useEffect(() => {
        dispatch(getBlogCategories())
    }, [])

    useEffect(() => {
        if (images.length !== 0)
            formik.values.images = images
    }, [images])

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
            title: '',
            description: '',
            category: '',
            images: []
        },
        validationSchema: userSchema,
        onSubmit: values => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('category', values.category);

            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
            dispatch(editBlog({ id: prod?._id as string, data: formData }));
            formik.resetForm();
        },
    });

    useEffect(() => {
        formik.setValues({
            title: prod?.title || '',
            description: prod?.description || '',
            category: '',
            images: prod?.images || [],
        });
        
        if (prod?.category) {
            formik.setFieldValue('category', prod.category?._id);
        }
    }, [prod]);

    return (
        <>
            <div className={`max-h-[500px] overflow-y-scroll absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-20 transition-all ease-in ${
                modal === true ? "scale-100 duration-200" : "scale-0 duration-200"
            } p-4 ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } overflow-x-hidden overflow-y-auto rounded-md min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]`}
                id="title">
                <h5 className={`text-xl font-Rubik font-medium leading-normal ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    Edit Blog
                </h5>
                <button 
                    type="button" 
                    onClick={() => dispatch(openModal(false))} 
                    className={`absolute top-3 right-2.5 ${
                        isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-400 hover:bg-gray-200'
                    } bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center`}
                >
                    <RxCross2 size={20} />
                    <span className="sr-only">Close modal</span>
                </button>
                
                <form className="p-4 space-y-3 w-full" onSubmit={formik.handleSubmit}>
                    {/* title */}
                    <CustomInput 
                        id="title" 
                        name="title" 
                        placeholder="Edit Title" 
                        value={formik.values.title} 
                        className="w-full" 
                        onChange={formik.handleChange("title")} 
                        onBlur={formik.handleBlur("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 text-[14px]">{formik.errors.title}</div>
                    ) : null}
                    
                    {/* description */}
                    <label htmlFor="Description" className={`block text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                        Description <span className="text-red-500 text-lg">*</span>
                    </label>
                    <div className={isDarkMode ? 'ql-dark' : ''}>
                        <ReactQuill
                            theme="snow"
                            value={formik.values?.description}
                            onChange={(value) => formik.setFieldValue('description', value)}
                            onBlur={() => formik.setFieldTouched('description', true)}
                            modules={{
                                clipboard: {
                                    matchVisual: false,
                                },
                            }}
                            className={isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}
                        />
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-500 text-[14px]">{formik.errors.description}</div>
                    ) : null}

                    {/* category */}
                    <label htmlFor="Category" className={`block text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                        Category <span className="text-red-500 text-lg">*</span>
                    </label>
                    <select 
                        name="category" 
                        id="Category"
                        onChange={formik.handleChange("category")} 
                        onBlur={formik.handleBlur('category')} 
                        value={formik.values.category}
                        className={`w-1/4 block px-2 py-2 border rounded-sm outline-none ${
                            isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-white' 
                                : 'bg-gradient-to-r from-green-400 to-yellow-300 border-gray-300'
                        }`}
                    >
                        <option value="">Select Category</option>
                        {blogCategory.map((cat, index) => (
                            <option key={index} value={cat?._id}>{cat?.title}</option>
                        ))}
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                        <div className="text-red-500 text-[14px]">{formik.errors.category}</div>
                    ) : null}

                    {/* image upload */}
                    <Dropzone onDrop={acceptedFiles => {
                        toast.success("images added", {
                            position: 'top-right'
                        })
                        setImages(acceptedFiles)
                    }}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="flex items-center justify-center w-full" {...getRootProps()}>
                                <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
                                    isDarkMode 
                                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500' 
                                        : 'bg-gray-200 border-gray-300 hover:bg-gray-100'
                                }`}>
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <AiOutlineCloudUpload size={20} className={`w-8 h-8 mb-4 ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                        }`} />
                                        <p className={`mb-2 text-sm ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                        }`}><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className={`text-xs ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                        }`}>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input {...getInputProps()} />
                                </label>
                            </div>
                        )}
                    </Dropzone>
                    
                    <button 
                        type="submit" 
                        className={`px-5 py-2 rounded-md text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium ${
                            isDarkMode 
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                                : 'bg-gradient-to-r from-slate-700 to-red-500'
                        }`}
                    >
                        Edit Blog
                    </button>
                </form>
            </div>
            
            {/* Overlays */}
            <div 
                onClick={() => dispatch(openModal(false))} 
                className={`${modal === true ? "block delay-75" : "hidden"} transition-all ease-in absolute top-0 left-0 z-0 bg-black opacity-50 w-full h-screen`}
            ></div>
            
            <div className={`${isLoading === true ? "block bg-black opacity-50 absolute top-0 left-0 z-20 w-full h-screen" : "hidden"}`}>
                <SyncLoader
                    color="#361AE3"
                    loading={isLoading}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    )
}

export default BlogModal