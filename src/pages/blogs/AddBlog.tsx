import 'react-quill/dist/quill.snow.css';
import React, { CSSProperties, useEffect } from 'react'
import { toast } from "react-toastify";

import CustomInput from '../../components/CustomInput'
import ReactQuill from 'react-quill';
import { useState } from "react"
import { Stepper } from 'react-form-stepper';
import { AiOutlineCloudUpload } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/Store';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { createBlog } from '../../Redux/Reducers/blogs/blogSlice';
import { object, string } from 'yup';
import { getBlogCategories } from '../../Redux/Reducers/blogCategory/blogCatSlice';
import Dropzone from 'react-dropzone';

let blogSchema = object({
  title: string().required('Title is Required'),
  description: string().required('Description is Required'),
  category: string().required('Please Select the Category'),
});

const AddBlog = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { message, user, isError, isSuccess } = useSelector((state: RootState) => state.auth)
  const { isLoading } = useSelector((state: RootState) => state.blogs)
  const { blogCategory } = useSelector((state: RootState) => state.blogCat)

  const [images, setImages] = useState<any>([])


  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isLoading, isError, isSuccess])

  useEffect(() => {
    dispatch(getBlogCategories())
  }, [])

  useEffect(() => {
    if (images.length !== 0)
      formik.values.images = images
  }, [])
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
      category: '',
      description: '',
      images: [],
    },
    validationSchema: blogSchema,
    onSubmit: values => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);

      // Append each image with the key "images"
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
      dispatch(createBlog(formData));
      formik.resetForm();
    },
  });
  return (
    <div>
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Add A New Blog</h3>
      <Stepper
        steps={[{ label: 'Add Blog Details' }, { label: 'Upload Image' }, { label: 'Finish' }]}
        activeStep={1}
      />
      <div>
        <form action="" method="post" className='space-y-3' onSubmit={formik.handleSubmit}>
          {/* add title */}
          <CustomInput value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur('title')} placeholder="Enter Blog Title" classname="blog" id="blogtitle" type="text" />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.title}</div>
          ) : null}

          {/* add category */}
          <label htmlFor="BlogCategory" className="block text-sm font-medium text-gray-900">
            Category <span className="text-red-500 text-lg">*</span>
          </label>
          <select name="category" id="BlogCategory"
            onChange={formik.handleChange("category")} onBlur={formik.handleBlur('category')} value={formik.values.category}
            className='w-1/4 px-2 py-2 bg-gradient-to-r from-green-400 to-yellow-300  border rounded-sm outline-none'>
            <option value="">Select Blog Category</option>
            {blogCategory.map((cat, index) => (
              <option key={index} value={cat?._id}>{cat?.title}</option>
            ))}
          </select>

          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.category}</div>
          ) : null}

          {/* add description */}
          <label htmlFor="AddDescription" className="block text-sm font-medium text-gray-900">
            Add Description <span className="text-red-500 text-lg">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue('description', value)}
            onBlur={() => formik.setFieldTouched('description', true)}
            modules={{
              clipboard: {
                matchVisual: false, // Disable paste formatting
              },
            }}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.description}</div>
          ) : null}

          {/* upload */}
          <label htmlFor="AddBlogImage" className="block text-sm font-medium text-gray-900">
            Add Image <span className="text-red-500 text-lg">*</span>
          </label>
          <Dropzone onDrop={acceptedFiles => {
            toast.success("images added", {
              position: 'top-right'
            })
            setImages(acceptedFiles)
          }}>
            {({ getRootProps, getInputProps }) => (
              <div className="flex items-center justify-center w-full" {...getRootProps()}>
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload size={20} className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input {...getInputProps()} />
                </label>
              </div>
            )}
          </Dropzone>

          <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>Add Blog</button>


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

export default AddBlog