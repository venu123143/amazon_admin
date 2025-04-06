"use client"

import { useEffect, useState, type CSSProperties, useCallback } from "react"
import Select from "react-select"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import Dropzone from "react-dropzone"
import { array, number, object, string } from "yup"
import { useDispatch, useSelector } from "react-redux"
import { SyncLoader } from "react-spinners"
import { useNavigate } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { CloudUpload, X, ChevronLeft, ChevronRight } from "lucide-react"

import type { AppDispatch, RootState } from "../../Redux/Store"
import CustomInput from "../../components/CustomInput"
import AddTags from "../../components/AddTags"
import { getColors } from "../../Redux/Reducers/color/colorSlice"
import { getAllBrands } from "../../Redux/Reducers/brand/brandSlice"
import { getCategories } from "../../Redux/Reducers/pcategory/pcategorySlice"
import { createProduct } from "../../Redux/Reducers/product/productSlice"
import CKEditorComponent from "../../helpers/CkEditor"
import { uploadImages, resetImages } from "../../Redux/Reducers/upload/uploadSlice"
import { useTheme } from "../../context/themecontent"

const userSchema = object({
  title: string().required("Title is Required"),
  description: string().required("Description is Required"),
  price: number().required("Price is required"),
  color: array().min(1, "Add at least one color").required("At least one color is required"),
  brand: string().required("Please Select the brand"),
  category: string().required("Please Select the Category"),
  quantity: number().required("Enter the quantity"),
  tags: array().min(1, "Add at least one tag").required(""),
})

const AddProduct = () => {
  const [color, setColor] = useState<any>([])
  const [tags, setTags] = useState<any>([])
  const [image, setImages] = useState<any>([])
  const { isDarkMode } = useTheme()

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { message, user, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user === null) {
      navigate("/")
    }
  }, [message, user, isError, isSuccess])

  let { isLoading } = useSelector((state: RootState) => state.product)
  const { brands } = useSelector((state: RootState) => state.brand)
  const { images, uploadLoading } = useSelector((state: RootState) => state.upload)
  const { categories } = useSelector((state: RootState) => state.pcategory)
  const { colors } = useSelector((state: RootState) => state.color)
  const options = colors.map((color) => ({ value: color._id, label: color.title }))
  const value = color.map((clr: any) => clr.value)

  if (isLoading || uploadLoading) {
    isLoading = true
  }

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: 380,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%, -50%)",
  }

  useEffect(() => {
    dispatch(getColors())
    dispatch(getAllBrands())
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (color.length !== 0) formik.values.color = value
    if (tags.length !== 0) formik.values.tags = tags
    if (image.length !== 0) formik.setFieldValue("images", image)
  }, [color, tags, image])

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      brand: "",
      color: [],
      tags: [],
      images: [],
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      const formData = new FormData()
      // Append each image with the key "images"
      for (let i = 0; i < values.images.length; i++) {
        formData.append("images", values.images[i])
      }
      if (formik.values.images.length > 0) {
        dispatch(uploadImages(formData))
      } else {
        dispatch(createProduct(values)).then(() => {
          formik.resetForm()
          setTags([])
          setImages([])
        })
      }
    },
  })

  useEffect(() => {
    if (images.length > 0) {
      dispatch(createProduct({ ...formik.values, images: images })).then(() => {
        dispatch(resetImages())
        formik.resetForm()
        setTags([])
        setImages([])
      })
    }
  }, [images])

  const handleRemoveImg = useCallback(
    (id: number) => {
      const imagesCopy = [...formik.values.images]
      imagesCopy.splice(id, 1)
      formik.setFieldValue("images", imagesCopy)
    },
    [formik.values.images],
  )

  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentImage, setCurrentImage] = useState(images[0])

  const closeFullscreen = () => {
    setCurrentIndex(null)
    setIsFullscreen(false)
    setCurrentImage(null)
  }

  const nextImage = () => {
    if (currentIndex! < images.length - 1) {
      setCurrentIndex(currentIndex! + 1)
      setCurrentImage(URL.createObjectURL(formik.values.images[currentIndex! + 1]))
    } else if (currentIndex! >= images.length - 1) {
      setIsFullscreen(false)
    }
  }

  const prevImage = () => {
    if (currentIndex! > 0) {
      setCurrentIndex(currentIndex! - 1)
      setCurrentImage(URL.createObjectURL(formik.values.images[currentIndex! - 1]))
    } else if (currentIndex! <= 0) {
      setIsFullscreen(false)
    }
  }

  const handleSetImage = (index: number) => {
    setCurrentIndex(index)
    setIsFullscreen(true)
    setCurrentImage(URL.createObjectURL(formik.values.images[index]))
  }

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // styles to apply when dragging
    background: isDragging ? (isDarkMode ? "#4ade80" : "lightgreen") : "",
    ...draggableStyle,
  })  
  

  const getListStyle = (isDraggingOver: any) => ({
    // styles to apply when dragging over the droppable area
    background: isDraggingOver ? (isDarkMode ? "#3b82f6" : "lightblue") : "",
    display: "flex",
    padding: 8,
    overflow: "auto",
  })

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const reorderedItems = reorder(formik.values.images, result.source.index, result.destination.index)
    formik.setFieldValue("images", reorderedItems)
  }

  // Custom styles for react-select
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: isDarkMode ? "#1f2937" : "white",
      borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
      "&:hover": {
        borderColor: isDarkMode ? "#6b7280" : "#9ca3af",
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDarkMode ? "#1f2937" : "white",
      borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? isDarkMode
          ? "#3b82f6"
          : "#2563eb"
        : state.isFocused
          ? isDarkMode
            ? "#374151"
            : "#f3f4f6"
          : isDarkMode
            ? "#1f2937"
            : "white",
      color: state.isSelected ? "white" : isDarkMode ? "#f9fafb" : "#111827",
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: isDarkMode ? "#f9fafb" : "#111827",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: isDarkMode ? "#f9fafb" : "#111827",
      "&:hover": {
        backgroundColor: isDarkMode ? "#4b5563" : "#d1d5db",
        color: isDarkMode ? "#f9fafb" : "#111827",
      },
    }),
    input: (base: any) => ({
      ...base,
      color: isDarkMode ? "#f9fafb" : "#111827",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: isDarkMode ? "#9ca3af" : "#6b7280",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDarkMode ? "#f9fafb" : "#111827",
    }),
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
      <h3 className="font-medium text-2xl text-gray-900 dark:text-white mb-6">Add Product</h3>
      <div>
        <form action="" method="post" onSubmit={formik.handleSubmit} className="space-y-6 w-full">
          {/* title */}
          <CustomInput
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            placeholder="Product Title"
            classname="ProductTitle"
            id="ProductTitle"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-sm -mt-4">{formik.errors.title}</div>
          ) : null}

          {/* description */}
          <div className="mb-4">
            <label htmlFor="Description" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              Description <span className="text-red-500 text-lg">*</span>
            </label>
            <CKEditorComponent
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue("description", value)}
              theme={isDarkMode ? "dark" : "light"}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            ) : null}
          </div>

          {/* price */}
          <CustomInput
            type="text"
            placeholder="Product Price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            classname="ProductPrice"
            id="ProductPrice"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-sm -mt-4">{formik.errors.price}</div>
          ) : null}

          {/* quantity */}
          <CustomInput
            type="text"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            placeholder="Product Quantity"
            classname="Quantity"
            id="Quantity"
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="text-red-500 text-sm -mt-4">{formik.errors.quantity}</div>
          ) : null}

          {/* add tags */}
          <AddTags tags={tags} setTags={setTags} onBlur={formik.handleBlur("tags")} />
          {formik.touched.tags && formik.errors.tags ? (
            <div className="text-red-500 text-sm -mt-4">{formik.errors.tags}</div>
          ) : null}

          {/* color */}
          <div className="mb-4">
            <label htmlFor="SelectColor" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              Color <span className="text-red-500 text-lg">*</span>
            </label>
            <Select
              options={options}
              isMulti
              className="basic-multi-select"
              classNamePrefix="select"
              name="color"
              onChange={(e) => setColor(e)}
              onBlur={formik.handleBlur("color")}
              styles={selectStyles}
            />
            {formik.touched.color && formik.errors.color ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.color}</div>
            ) : null}
          </div>

          {/* category */}
          <div className="mb-4">
            <label htmlFor="Category" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              Category <span className="text-red-500 text-lg">*</span>
            </label>
            <select
              name="category"
              id="Category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
              className="w-full md:w-1/3 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat?._id}>
                  {cat?.title}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
            ) : null}
          </div>

          {/* brand */}
          <div className="mb-4">
            <label htmlFor="SelectBrand" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              Brand <span className="text-red-500 text-lg">*</span>
            </label>
            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
              id="SelectBrand"
              className="w-full md:w-1/3 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand?._id}>
                  {brand?.title}
                </option>
              ))}
            </select>
            {formik.touched.brand && formik.errors.brand ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.brand}</div>
            ) : null}
          </div>

          {/* big image */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-80 dark:bg-opacity-90 z-50 flex items-center justify-center ${isFullscreen ? "block" : "hidden"
              }`}
          >
            <div className="relative max-w-4xl mx-auto">
              <img
                src={currentImage || "/placeholder.svg"}
                alt={`Image ${currentIndex! + 1}`}
                className="max-h-[80vh] max-w-full"
              />
              <button
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                onClick={closeFullscreen}
              >
                <X size={20} />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                onClick={nextImage}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* upload images*/}
          <div className="mb-4">
            <label htmlFor="AddImages" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
              Add Images <span className="text-red-500 text-lg">*</span>
            </label>
            {formik.values?.images.length > 0 &&
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
                                  onClick={() => {
                                    handleSetImage(index)
                                  }}
                                  alt="productimages"
                                  className="w-32 h-32 object-cover rounded-lg cursor-pointer"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImg(index)}
                                  className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X size={16} />
                                </button>
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

            <Dropzone
              onDrop={(acceptedFiles) => {
                toast.success("Images added", {
                  position: "top-right",
                })
                setImages(acceptedFiles)
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="flex items-center justify-center w-full" {...getRootProps()}>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudUpload className="w-10 h-10 mb-3 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input {...getInputProps()} />
                  </label>
                </div>
              )}
            </Dropzone>
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white transition-all duration-200 hover:shadow-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Add Product
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

export default AddProduct

