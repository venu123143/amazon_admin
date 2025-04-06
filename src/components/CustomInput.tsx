import type React from "react"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classname?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ classname, ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
        {props.placeholder} {props.required && <span className="text-red-500 text-lg">*</span>}
      </label>
      <input
        {...props}
        className={`w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-gray-100 ${classname}`}
      />
    </div>
  )
}

export default CustomInput

