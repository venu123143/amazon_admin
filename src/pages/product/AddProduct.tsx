import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import ReactQuill from 'react-quill';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const AddProduct = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Add Product</h3>
      <div>
        <form action="" method="post" className='space-y-2'>
          <CustomInput type="text" placeholder="Enter Product Title" className="ProductTitle" id="ProductTitle" />
          <label htmlFor="Description" className="block text-sm font-medium text-gray-900">
            Description <span className="text-red-500 text-lg">*</span>
          </label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <CustomInput type="text" placeholder="Enter Product price" className="ProductPrice" id="ProductPrice" />

          <label htmlFor="Category" className="block text-sm font-medium text-gray-900">
            Category <span className="text-red-500 text-lg">*</span>
          </label>
          <select name="" id="Category" className='w-1/4 block px-2 py-2 bg-gradient-to-r from-green-400 to-yellow-300  border rounded-sm outline-none'>
            <option value="">Select Category</option>
          </select>
          <label htmlFor="Quantity" className="block text-sm font-medium text-gray-900">
            Quantity <span className="text-red-500 text-lg">*</span>
          </label>
          <select name="" id="Quantity" className='w-1/4 block px-2 py-2 bg-gradient-to-r from-green-400 to-yellow-300  border rounded-sm outline-none'>
            <option value="">Select Quantity</option>
          </select>
          <label htmlFor="SelectColor" className="block text-sm font-medium text-gray-900">
            Color <span className="text-red-500 text-lg">*</span>
          </label>
          <select name="" id="Quantity" className='w-1/4 block px-2 py-2 bg-gradient-to-r from-green-400 to-yellow-300  border rounded-sm outline-none'>
            <option value="">Select color</option>
          </select>
          <label htmlFor="SelectBrand" className="block text-sm font-medium text-gray-900">
            Brand <span className="text-red-500 text-lg">*</span>
          </label>
          <select name="" id="SelectBrand" className='w-1/4 block px-2 py-2 bg-gradient-to-r from-green-400 to-yellow-300  border rounded-sm outline-none'>
            <option value="">Select Brand</option>
          </select>



          <label htmlFor="AddImages" className="block text-sm font-medium text-gray-900">
            Add Images <span className="text-red-500 text-lg">*</span>
          </label>
          {/* upload */}
          <div className="flex items-center justify-center w-full" >
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <AiOutlineCloudUpload size={20} className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
            Add Product
          </button>
        </form>
      </div>


    </div>
  )
}

export default AddProduct