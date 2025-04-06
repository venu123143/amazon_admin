import React, { useEffect, useState, CSSProperties, useMemo, useCallback } from 'react'
import Select from 'react-select';
import { toast } from "react-toastify"
import { useFormik } from 'formik';
import Dropzone from 'react-dropzone'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CKEditorComponent from '../helpers/CkEditor'; // Your CKEditor wrapper component
import { array, number, object, string } from 'yup';
import { AiOutlineCloudUpload, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store';
import AddTags from './AddTags';
import { SyncLoader } from 'react-spinners';
import { RxCross2 } from 'react-icons/rx'
import CustomInput from './CustomInput'
import { getColors } from '../Redux/Reducers/color/colorSlice';
import { getCategories } from '../Redux/Reducers/pcategory/pcategorySlice';
import { getAllBrands } from '../Redux/Reducers/brand/brandSlice';
import { editProduct, openModal } from '../Redux/Reducers/product/productSlice';
import { useTheme } from '../context/themecontent'; // Your theme context

let userSchema = object({
    title: string().required('Title is Required'),
    description: string().required('Description is Required'),
    price: number().required('Price is required'),
    color: array().min(1, 'Add atleast one color').required('At least one color is required'),
    brand: string().required('Please Select the brand'),
    category: string().required('Please Select the Category'),
    quantity: number().required('Enter the quantity'),
    tags: array().min(1, 'Add atleast one tag').required('')
});

const ProductModal = ({ prod }: any) => {
    const [color, setColor] = useState<any>([])
    const [tags, setTags] = useState<any>([])
    const { isDarkMode } = useTheme();

    const dispatch: AppDispatch = useDispatch()
    const { isLoading, modal } = useSelector((state: RootState) => state.product)
    const { brands } = useSelector((state: RootState) => state.brand)
    const { categories } = useSelector((state: RootState) => state.pcategory)
    const { colors } = useSelector((state: RootState) => state.color)

    const options = useMemo(() => colors.map(color => ({ 
        value: color._id, 
        label: color.title 
    })), [colors]);
    
    const value = useMemo(() => color.map((clr: any) => clr.value), [color]);

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
    }, [color, tags])

    type Image = {
        url: string;
        asset_id: string;
        public_id: string;
    };

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
            images: [] as (Image | File)[],
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
            for (let i = 0; i < values.images.length; i++) {
                const image = values.images[i];
                if ('url' in image) {
                    formData.append('existingImg', JSON.stringify(image));
                }
                else {
                    formData.append('images', values.images[i] as File);
                }
            }
            dispatch(editProduct({ id: prod?._id as string, data: formData }));
            formik.resetForm();
            setTags([])
        },
    });

    useEffect(() => {
        formik.setValues({
            title: prod?.title || '',
            description: prod?.description || '',
            price: prod?.price || '',
            quantity: prod?.quantity || '',
            tags: tags || [],
            color: prod?.color?.map((clr: any) => clr._id) || [],
            category: '',
            brand: '',
            images: prod?.images || [],
        });
        
        if (prod?.category) {
            formik.setFieldValue('category', prod.category?._id);
        }
        if (prod?.brand) {
            formik.setFieldValue('brand', prod.brand?._id);
        }
        if (prod?.tags) {
            setTags(prod?.tags)
        }
        if (prod?.images) {
            formik.setFieldValue("images", prod?.images);
        }
    }, [prod]);

    const handleRemoveImg = useCallback((id: number) => {
        const imagesCopy = [...formik.values.images];
        imagesCopy.splice(id, 1);
        formik.setFieldValue("images", imagesCopy);
    }, [formik.values.images]);

    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentImage, setCurrentImage] = useState<any>(null);
    
    const closeFullscreen = () => {
        setCurrentIndex(null);
        setIsFullscreen(false);
        setCurrentImage(null);
    };
    
    const nextImage = () => {
        if (currentIndex! < formik.values.images.length - 1) {
            setCurrentIndex(currentIndex! + 1);
            setCurrentImage(formik.values.images[currentIndex! + 1]);
        }
        else if (currentIndex! >= formik.values.images.length - 1) {
            setIsFullscreen(false);
        }
    };
    
    const prevImage = () => {
        if (currentIndex! > 0) {
            setCurrentIndex(currentIndex! - 1);
            setCurrentImage(formik.values.images[currentIndex! - 1]);
        } else if (currentIndex! <= 0) {
            setIsFullscreen(false);
        }
    };
    
    const handleSetImage = (index: number) => {
        setCurrentIndex(index);
        setIsFullscreen(true);
        setCurrentImage(formik.values.images[index]);
    };
    
    const reorder = (list: any, startIndex: any, endIndex: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const getItemStyle = (isDragging: any, draggableStyle: any) => ({
        background: isDragging ? (isDarkMode ? '#4B5563' : '#D1FAE5') : '',
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver: any) => ({
        background: isDraggingOver ? (isDarkMode ? '#374151' : '#EFF6FF') : '',
        display: 'flex',
        padding: 8,
        overflow: 'auto',
    });

    const onDragEnd = useCallback((result: any) => {
        if (!result.destination) {
            return;
        }
        const reorderedItems = reorder(formik.values.images, result.source.index, result.destination.index);
        formik.setFieldValue("images", reorderedItems);
    }, [formik.values.images]);

    return (
        <>
            <div className={`max-h-[500px] overflow-y-scroll absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-20 transition-all ease-in ${modal === true ? "scale-100 duration-200" : "scale-0 duration-200"} p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} overflow-x-hidden overflow-y-auto rounded-md min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]`}
                id="title">
                <h5 className={`text-xl font-Rubik font-medium leading-normal ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Edit Product
                </h5>
                <button 
                    type="button" 
                    onClick={() => dispatch(openModal(false))} 
                    className={`absolute top-3 right-2.5 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-200'} bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center`}
                >
                    <RxCross2 size={20} />
                    <span className="sr-only">Close modal</span>
                </button>
                
                <form className="p-4 space-y-3 w-full" onSubmit={formik.handleSubmit}>
                    <div className='flex justify-between space-x-2'>
                        <div>
                            <CustomInput 
                                id="title" 
                                name="title" 
                                placeholder={`Edit Title`} 
                                value={formik.values.title} 
                                className="w-full" 
                                onChange={formik.handleChange("title")} 
                                onBlur={formik.handleBlur("title")} 
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <div className="text-red-500 text-[14px]">{formik.errors.title}</div>
                            ) : null}
                        </div>
                        <div>
                            <CustomInput 
                                id="price" 
                                name="price" 
                                placeholder={`Edit price`} 
                                value={formik.values.price} 
                                className="w-full" 
                                onChange={formik.handleChange("price")} 
                                onBlur={formik.handleBlur("price")} 
                            />
                            {formik.touched.price && formik.errors.price ? (
                                <div className="text-red-500 text-[14px]">{formik.errors.price}</div>
                            ) : null}
                        </div>
                        <div>
                            <CustomInput 
                                id="quantity" 
                                name="quantity" 
                                placeholder={`Edit Quantity`} 
                                value={formik.values.quantity} 
                                className="w-full" 
                                onChange={formik.handleChange("quantity")} 
                                onBlur={formik.handleBlur("quantity")} 
                            />
                            {formik.touched.quantity && formik.errors.quantity ? (
                                <div className="text-red-500 text-[14px]">{formik.errors.quantity}</div>
                            ) : null}
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="Description" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            Description <span className="text-red-500 text-lg">*</span>
                        </label>
                        <CKEditorComponent
                            value={formik.values.description}
                            onChange={(value) => formik.setFieldValue("description", value)}
                            theme={isDarkMode ? "dark" : "light"}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-red-500 text-[14px]">{formik.errors.description}</div>
                        ) : null}
                    </div>
                    
                    <div className=''>
                        <AddTags tags={tags} setTags={setTags} onBlur={formik.handleBlur("tags")} />
                        {formik.touched.tags && formik.errors.tags ? (
                            <div className="text-red-500 text-[14px]">{formik.errors.tags}</div>
                        ) : null}
                        
                        <label htmlFor="SelectColor" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            Color <span className="text-red-500 text-lg">*</span>
                        </label>
                        <Select 
                            options={options} 
                            isMulti 
                            className="basic-multi-select" 
                            defaultValue={prod?.color?.map((clr: any) => clr.title)}
                            classNamePrefix="select color" 
                            name="color" 
                            onChange={(e) => setColor(e)} 
                            onBlur={formik.handleBlur('color')}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: isDarkMode ? '#374151' : 'white',
                                    borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: isDarkMode ? '#374151' : 'white',
                                }),
                                option: (base, { isFocused, isSelected }) => ({
                                    ...base,
                                    backgroundColor: isDarkMode 
                                        ? isSelected 
                                            ? '#4B5563' 
                                            : isFocused 
                                                ? '#4B5563' 
                                                : '#374151'
                                        : isSelected 
                                            ? '#E5E7EB' 
                                            : isFocused 
                                                ? '#F3F4F6' 
                                                : 'white',
                                    color: isDarkMode ? 'white' : 'black',
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: isDarkMode ? 'white' : 'black',
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: isDarkMode ? 'white' : 'black',
                                }),
                            }}
                        />
                        {formik.touched.color && formik.errors.color ? (
                            <div className="text-red-500 text-[14px]">{formik.errors.color}</div>
                        ) : null}

                        <label htmlFor="Category" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
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
                            {categories.map((cat, index) => (
                                <option key={index} value={cat?._id}>{cat?.title}</option>
                            ))}
                        </select>
                        {formik.touched.category && formik.errors.category ? (
                            <div className="text-red-500 text-[14px]">{formik.errors.category}</div>
                        ) : null}

                        <label htmlFor="SelectBrand" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            Brand <span className="text-red-500 text-lg">*</span>
                        </label>
                        <select 
                            name="brand"
                            onChange={formik.handleChange('brand')} 
                            onBlur={formik.handleBlur('brand')} 
                            value={formik.values.brand}
                            id="SelectBrand" 
                            className={`w-1/4 block px-2 py-2 border rounded-sm outline-none ${
                                isDarkMode 
                                    ? 'bg-gray-700 border-gray-600 text-white' 
                                    : 'bg-gradient-to-r from-green-400 to-yellow-300 border-gray-300'
                            }`}
                        >
                            <option value="">Select Brand</option>
                            {brands.map((brand, index) => (
                                <option key={index} value={brand?._id}>{brand?.title}</option>
                            ))}
                        </select>
                        {formik.touched.brand && formik.errors.brand ? (
                            <div className="text-red-500 text-[14px]">{formik.errors.brand}</div>
                        ) : null}
                    </div>

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
                                            <Draggable key={index} draggableId={each?.path ? each?.path : each.url} index={index}>
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
                                                                {each?.url ? (
                                                                    <img 
                                                                        src={each?.url} 
                                                                        onClick={() => handleSetImage(index)}
                                                                        alt="productimages" 
                                                                        className="max-w-full img h-auto align-middle inline-block rounded-lg object-cover object-center col-span-1" 
                                                                    />
                                                                ) : (
                                                                    <img 
                                                                        src={URL.createObjectURL(each)} 
                                                                        onClick={() => handleSetImage(index)}
                                                                        alt="productimages" 
                                                                        className="max-w-full img h-auto align-middle inline-block rounded-lg object-cover object-center col-span-1" 
                                                                    />
                                                                )}

                                                                <RxCross2 
                                                                    onClick={() => handleRemoveImg(index)}
                                                                    className={`absolute top-3 right-3 p-2 cursor-pointer rounded-full ${
                                                                        isDarkMode 
                                                                            ? 'bg-gray-600 hover:bg-gray-500' 
                                                                            : 'bg-gray-300 hover:bg-white'
                                                                    }`}
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
                        formik.setFieldValue("images", [...prod?.images, ...acceptedFiles]);
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
                        type='submit' 
                        className={`px-5 py-2 rounded-md text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium ${
                            isDarkMode 
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                                : 'bg-gradient-to-r from-slate-700 to-red-500'
                        }`}
                    >
                        Edit Product
                    </button>
                </form>
            </div>
            
            {/* Fullscreen image viewer */}
            <div className={`overflow-y-scroll absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-30 transition-all ease-in ${isFullscreen ? "block" : "hidden"}`}>
                <div className="fullscreen-modal">
                    {currentImage && (
                        <img 
                            src={currentImage?.url ? currentImage?.url : URL.createObjectURL(currentImage)} 
                            alt="productimages" 
                            className={`${isFullscreen ? "block" : "hidden"} max-w-full img h-auto align-middle inline-block rounded-lg object-cover object-center col-span-1`} 
                        />
                    )}
                    <span 
                        className={`close-button p-2 rounded-full ${
                            isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'
                        }`} 
                        onClick={closeFullscreen}
                    >
                        <RxCross2 />
                    </span>
                    <span 
                        className={`prev-button p-2 rounded-full ${
                            isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'
                        }`} 
                        onClick={prevImage}
                    >
                        <AiOutlineLeft />
                    </span>
                    <span 
                        className={`next-button p-2 rounded-full ${
                            isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'
                        }`} 
                        onClick={nextImage}
                    >
                        <AiOutlineRight />
                    </span>
                </div>
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
            
            <div 
                onClick={() => dispatch(openModal(false))} 
                className={`${isFullscreen === true ? "block delay-75" : "hidden"} transition-all ease-in absolute top-0 left-0 z-20 bg-black opacity-50 w-full h-full`}
            ></div>
        </>
    )
}

export default React.memo(ProductModal);