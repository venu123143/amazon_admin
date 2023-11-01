import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react"

const CustomInput = (props: any) => {
    const { placeholder, className, id, type, name, value, onChange, onBlur } = props;
    
    const [visible, setVisible] = useState(false)

    return (
        <>
            <div className="relative">
                <label htmlFor={id} className="block mb-2 text-sm font-medium text-skin-base dark:text-white">
                    {placeholder} <span className="text-red-500 text-lg">*</span>
                </label>
                <input  type={`${visible === true ? "text" : type}`} id={id} name={name} value={value} onChange={onChange} onBlur={onBlur}
                    className={` ${className}  bg-gray-50 border border-gray-300 text-skin-base text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                    placeholder={placeholder}
                />
                <div onClick={() => setVisible(!visible)} className={`${type === "password" ? "block" : "hidden"} absolute top-11 right-3 cursor-pointer`}>
                    {visible === true ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
                </div>
            </div>
        </>
    )
}

export default CustomInput