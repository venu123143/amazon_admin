import React, { useState } from 'react'
import { BsTags } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"

const AddTags = ({ tags, setTags, onBlur }: any) => {    
    const [value, setValue] = useState("")
    const handleSubmit = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            setTags([...tags, value])
            setValue("")
        }
    }
    const removeTag = (index: number) => {
        const updatedTags = [...tags]
        updatedTags.splice(index, 1)
        setTags(updatedTags)


    }

    return (
        <div className=" w-full flex flex-col space-y-2 items-center mx-4 sm:mx-0">
            <div className='w-full relative' onKeyDown={handleSubmit}>
                <label htmlFor="tags" className="block w-full mb-2  text-sm font-medium text-gray-900 dark:text-white">
                    Enter Tags <span className='text-red-600 text-lg'>*</span>
                </label>
                <BsTags size={20} className="absolute bottom-2 left-3" />
                <input onChange={(e) => setValue(e.target.value)} onBlur={onBlur} value={value} type="text" id="tags" className="bg-gray-50 border pl-10 w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter the tags here" />
            </div>

            <div className='my-3 w-full flex flex-wrap -m-1'>
                {tags.map((each: string, index: number) => (
                    <span key={index}
                        className="m-1 font-Rubik flex flex-wrap justify-between items-center text-xs sm:text-sm shadow-md hover:shadow-lg bg-gray-200 hover:bg-gradient-to-r from-slate-200 to-purple-600 font-[450] rounded px-4 py-2  leading-loose cursor-pointer ">
                        {each}
                        <RxCross2 onClick={() => removeTag(index)} size={20} />
                    </span>
                ))}

            </div>
        </div>
    )
}

export default AddTags