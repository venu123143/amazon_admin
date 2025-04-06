import 'react-quill/dist/quill.snow.css';
import { CSSProperties, useEffect } from 'react'
import { toast } from "react-toastify";

import CustomInput from '../../components/CustomInput'
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
import { useTheme } from "../../context/themecontent"
import CKEditorComponent from '../../helpers/CkEditor';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

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
  const { isDarkMode } = useTheme()

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

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const reorderedItems = reorder(formik.values.images, result.source.index, result.destination.index)
    formik.setFieldValue("images", reorderedItems)
  }

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // styles to apply when dragging
    background: isDragging ? (isDarkMode ? "#4ade80" : "lightgreen") : "",
    ...draggableStyle,
  })
  const stepperTheme = {
    activeBgColor: isDarkMode ? '#6366f1' : '#dc2626',
    activeTextColor: '#ffffff',
    completedBgColor: isDarkMode ? '#4ade80' : '#22c55e',
    completedTextColor: '#ffffff',
    inactiveBgColor: isDarkMode ? '#374151' : '#e5e7eb',
    inactiveTextColor: isDarkMode ? '#9ca3af' : '#6b7280',
    size: '2em',
    circleFontSize: '1em',
    labelFontSize: '0.9em',
    borderRadius: '50%',
    fontWeight: '500',
  };
  const getListStyle = (isDraggingOver: any) => ({
    // styles to apply when dragging over the droppable area
    background: isDraggingOver ? (isDarkMode ? "#3b82f6" : "lightblue") : "",
    display: "flex",
    padding: 8,
    overflow: "auto",
  })
  return (
    <div className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h3 className={`font-Rubik font-[550] text-[1.52rem] my-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add A New Blog</h3>
      <Stepper
        steps={[{ label: 'Add Blog Details' }, { label: 'Upload Image' }, { label: 'Finish' }]}
        activeStep={1}
        styleConfig={stepperTheme}
      />

      <div>
        <form action="" method="post" className='space-y-3' onSubmit={formik.handleSubmit}>
          {/* add title */}
          <CustomInput
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur('title')}
            placeholder="Enter Blog Title"
            classname={`blog ${isDarkMode ? 'dark' : ''}`}
            id="blogtitle"
            type="text"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.title}</div>
          ) : null}

          {/* add category */}
          <label htmlFor="BlogCategory" className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Category <span className="text-red-500 text-lg">*</span>
          </label>
          <select
            name="category"
            id="BlogCategory"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            className={`w-1/4 px-2 py-2 border rounded-sm outline-none ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="">Select Blog Category</option>
            {blogCategory.map((cat, index) => (
              <option key={index} value={cat?._id}>{cat?.title}</option>
            ))}
          </select>

          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.category}</div>
          ) : null}

          {/* add description */}
          <label htmlFor="AddDescription" className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Add Description <span className="text-red-500 text-lg">*</span>
          </label>
          <div className={isDarkMode ? 'ql-dark' : ''}>
            <CKEditorComponent
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue("description", value)}
              theme={isDarkMode ? "dark" : "light"}
            />
          </div>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.description}</div>
          ) : null}

          {/* upload */}
          <label htmlFor="AddBlogImage" className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Add Image <span className="text-red-500 text-lg">*</span>
          </label>

          {images?.length > 0 &&
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="images" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className={`${formik.values?.images.length > 0 ? "block" : "hidden"} mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg flex flex-wrap gap-4`}
                  >
                    {formik.values?.images?.map((each: any, index: number) => (
                      <Draggable key={index} draggableId={`image-${index}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            className="relative group"
                          >
                            <div className="relative">
                              <img
                                src={URL.createObjectURL(each) || "/placeholder.svg"}
                                alt="productimages"
                                className="w-32 h-32 object-cover rounded-lg cursor-pointer"
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          }

          <Dropzone onDrop={acceptedFiles => {
            toast.success("images added", {
              position: 'top-right'
            })
            setImages(acceptedFiles)
          }}>
            {({ getRootProps, getInputProps }) => (
              <div className="flex items-center justify-center w-full" {...getRootProps()}>
                <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-gray-500' : 'bg-gray-200 hover:bg-gray-100 border-gray-300 hover:border-gray-400'}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload size={20} className={`w-8 h-8 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <p className={`mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input {...getInputProps()} />
                </label>
              </div>
            )}
          </Dropzone>

          <button className={`px-5 py-2 rounded-md text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium ${isDarkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-slate-700 to-red-500'}`}>
            Add Blog
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

export default AddBlog