import React from 'react'
import CustomInput from '../../components/CustomInput'

const AddBrand = () => {
    return (
        <div>
            <h3 className="font-Rubik font-[550] text-[1.52rem] font  my-4 ">Add Brand</h3>
            <div>
                <form action="" method="post" className='space-y-3'>
                    <CustomInput type="text" placeholder="Enter Brand Title" className="AddBrand" id="AddBrand" />
                    <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
                        Add Brand
                    </button>

                </form>
            </div>

        </div>
    )
}

export default AddBrand