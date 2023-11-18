import { useEffect, useState, CSSProperties, useCallback } from 'react'
import Select from 'react-select';
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import Dropzone from 'react-dropzone'
import { array, number, object, string } from 'yup';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { AppDispatch, RootState } from '../../Redux/Store';
import CustomInput from '../../components/CustomInput'
import AddTags from '../../components/AddTags';
import { getColors } from '../../Redux/Reducers/color/colorSlice';
import { getAllBrands } from '../../Redux/Reducers/brand/brandSlice';
import { getCategories } from '../../Redux/Reducers/pcategory/pcategorySlice';
import { createProduct } from '../../Redux/Reducers/product/productSlice';


let userSchema = object({
  title: string().required('Title is Required'),
  description: string().required('Description is Required'),
  price: number().required('Price is required'),
  color: array().min(1, 'Add atleast one color').required('At least one color is required'),
  brand: string().required('Please Select the brand'),
  category: string().required('Please Select the Category'),
  quantity: number().required('Enter the quantity'),
  tags: array().min(1, 'Add atleast one tag').required(''),
});

const AddProduct = () => {
  const [color, setColor] = useState<any>([])
  const [tags, setTags] = useState<any>([])
  const [images, setImages] = useState<any>([])

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate();
  const { message, user, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (user === null) {
      navigate('/')
    }
  }, [message, user, isError, isSuccess])

  const { isLoading } = useSelector((state: RootState) => state.product)
  const { brands } = useSelector((state: RootState) => state.brand)
  const { categories } = useSelector((state: RootState) => state.pcategory)
  const { colors } = useSelector((state: RootState) => state.color)
  const options = colors.map((color) => ({ value: color._id, label: color.title }))
  const value = color.map((clr: any) => (clr.value))

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
  useEffect(() => {
    dispatch(getColors())
    dispatch(getAllBrands())
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (color.length !== 0)
      formik.values.color = value
    if (tags.length !== 0)
      formik.values.tags = tags
    if (images.length !== 0)
      // formik.values.images = images
      formik.setFieldValue('images', images);
  }, [color, tags, images])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: "",
      quantity: "",
      category: '',
      brand: '',
      color: [],
      tags: [],
      images: []
    },
    validationSchema: userSchema,
    onSubmit: values => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('brand', values.brand);
      formData.append('quantity', JSON.stringify(values.quantity));
      formData.append('price', JSON.stringify(values.price));
      formData.append('color', JSON.stringify(values.color));
      formData.append('tags', JSON.stringify(values.tags));

      // Append each image with the key "images"
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
      dispatch(createProduct(formData));
      formik.resetForm();
      setTags([])
      setImages([])
    },
  });

  const handleRemoveImg = useCallback((id: number) => {
    const imagesCopy = [...formik.values.images];
    imagesCopy.splice(id, 1);
    formik.setFieldValue("images", imagesCopy);
    setImages(imagesCopy)
  }, [formik.values.images]);



  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const closeFullscreen = () => {
    setCurrentIndex(null);
    setIsFullscreen(false);
    setCurrentImage(null);
  };
  var nextImage = () => {
    if (currentIndex! < images.length - 1) {
      setCurrentIndex(currentIndex! + 1);
      setCurrentImage(URL.createObjectURL(images[currentIndex! + 1]));
    }
    else if (currentIndex! >= images.length - 1) {
      setIsFullscreen(false);
    }
  };
  var prevImage = () => {
    if (currentIndex! > 0) {
      setCurrentIndex(currentIndex! - 1);
      setCurrentImage(URL.createObjectURL(images[currentIndex! - 1]));
    } else if (currentIndex! <= 0) {
      setIsFullscreen(false);
    }
  };
  var handleSetImage = (index: number) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
    setCurrentImage(URL.createObjectURL(images[index]));
  };

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // styles to apply when dragging
    background: isDragging ? 'lightgreen' : '',
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: any) => ({
    // styles to apply when dragging over the droppable area
    background: isDraggingOver ? 'lightblue' : '',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      images,
      result.source.index,
      result.destination.index
    );
    formik.setFieldValue("images", reorderedItems);
    setImages(reorderedItems);
  };

  return (
    <div>
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Add Product</h3>
      <div>
        <form action="" method="post" onSubmit={formik.handleSubmit} className='space-y-2 w-full'>
          {/* title */}
          <CustomInput type="text" name="title" value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur('title')} placeholder="Enter Product Title" className="ProductTitle" id="ProductTitle" />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.title}</div>
          ) : null}

          {/* description */}
          <label htmlFor="Description" className="block text-sm font-medium text-gray-900">
            Description <span className="text-red-500 text-lg">*</span>
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

          {/* price */}
          <CustomInput type="text" placeholder="Enter Product price" name="price" value={formik.values.price} onChange={formik.handleChange("price")} onBlur={formik.handleBlur('price')} className="ProductPrice" id="ProductPrice" />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.price}</div>
          ) : null}

          {/* quantity */}
          <CustomInput type="text" name="quantity" value={formik.values.quantity} onChange={formik.handleChange("quantity")} onBlur={formik.handleBlur('quantity')} placeholder="Enter Product Quantity" className="Quantity" id="Quantity" />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.quantity}</div>
          ) : null}

          {/* add tags */}
          <AddTags tags={tags} setTags={setTags} onBlur={formik.handleBlur("tags")} />
          {formik.touched.tags && formik.errors.tags ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.tags}</div>
          ) : null}

          {/* color */}
          <label htmlFor="SelectColor" className="block text-sm font-medium text-gray-900">
            Color <span className="text-red-500 text-lg">*</span>
          </label>
          <Select options={options} isMulti className="basic-multi-select "
            classNamePrefix="select" name="color" onChange={(e) => setColor(e)} onBlur={formik.handleBlur('color')} />
          {formik.touched.color && formik.errors.color ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.color}</div>
          ) : null}

          {/* category */}
          <label htmlFor="Category" className="block text-sm font-medium text-gray-900">
            Category <span className="text-red-500 text-lg">*</span>
          </label>
          <select name="category" id="Category"
            onChange={formik.handleChange("category")} onBlur={formik.handleBlur('category')} value={formik.values.category}
            className='w-1/4 block px-2 py-2 bg-gradient-to-r from-green-400 to-yellow-300  border rounded-sm outline-none'>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat?._id}>{cat?.title}</option>

            ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.category}</div>
          ) : null}

          {/* brand */}
          <label htmlFor="SelectBrand" className="block text-sm font-medium text-gray-900">
            Brand <span className="text-red-500 text-lg">*</span>
          </label>
          <select name="brand"
            onChange={formik.handleChange('brand')} onBlur={formik.handleBlur('brand')} value={formik.values.brand}
            id="SelectBrand" className='w-1/4 block px-2 py-2 bg-gradient-to-r from-green-400 to-yellow-300  border rounded-sm outline-none'>
            <option value="">Select Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand?._id}>{brand?.title}</option>

            ))}
          </select>
          {formik.touched.brand && formik.errors.brand ? (
            <div className="text-red-500 text-[14px] ">{formik.errors.brand}</div>
          ) : null}

          {/* big image */}
          <div className={` fixed -top-2 left-0 w-full h-full bg-black bg-opacity-80 z-50 ${isFullscreen ? "active" : "hidden"}`}>
            <div className="fullscreen-modal">
              <img
                src={currentImage}
                alt={`Image ${currentIndex! + 1}`}
                className="fullscreen-image"
              />
              <span className="close-button p-2 rounded-full bg-gray-300 text-black" onClick={closeFullscreen}>
                <RxCross2 />
              </span>
              <span className="prev-button p-2 rounded-full bg-gray-300 text-black" onClick={prevImage}>
                <AiOutlineLeft />
              </span>
              <span className="next-button p-2 rounded-full bg-gray-300 text-black" onClick={nextImage}>
                <AiOutlineRight />
              </span>
            </div>
          </div>
          {/* upload images*/}
          <label htmlFor="AddImages" className="block text-sm font-medium text-gray-900">
            Add Images <span className="text-red-500 text-lg">*</span>
          </label>
          {/* <div className="mt-10 mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 auto-rows-fr auto-flow-dense">
            {formik.values?.images?.map((each: any, index: number) => (
              <div key={index} className='inline-flex justify-center'>
                <div className="relative">
                  <img src={URL.createObjectURL(each)} onClick={() => {
                    handleSetImage(index);
                  }} alt="productimages" className="max-w-full img h-auto align-middle inline-block rounded-lg object-cover object-center col-span-1" />
                  <RxCross2 onClick={() => handleRemoveImg(index)}
                    className="absolute top-3 right-3 bg-gray-300 hover:bg-white p-2 cursor-pointer rounded-full"
                    size={35}
                  />
                </div>
              </div>
            ))}
          </div> */}

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <div className="mt-10 mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 auto-rows-fr auto-flow-dense">
                    {formik.values?.images?.map((each: any, index: number) => (
                      <Draggable key={index} draggableId={each?.path} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div key={index} className='inline-flex justify-center'>
                              <div className="relative">
                                <img src={URL.createObjectURL(each)} onClick={() => {
                                  handleSetImage(index);
                                }} alt="productimages" className="max-w-full img h-auto align-middle inline-block rounded-lg object-cover object-center col-span-1" />
                                <RxCross2 onClick={() => handleRemoveImg(index)}
                                  className="absolute top-3 right-3 bg-gray-300 hover:bg-white p-2 cursor-pointer rounded-full"
                                  size={35}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                      </Draggable>
                    ))}
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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


          <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
            Add Product
          </button>
        </form>
      </div>
      <div className={`${isLoading === true ? "block bg-black opacity-50 absolute top-0 left-0 w-full h-screen" : "hidden"}`}>
        <SyncLoader
          color="#361AE3"
          loading={isLoading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader" />
      </div>
    </div>
  )
}

export default AddProduct