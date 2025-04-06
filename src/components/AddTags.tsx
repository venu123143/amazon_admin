
import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"

interface AddTagsProps {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const AddTags: React.FC<AddTagsProps> = ({ tags, setTags, onBlur }) => {
  const [input, setInput] = useState("")

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()])
      }
      setInput("")
    }
  }

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className="mb-4">
      <label htmlFor="tags" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
        Tags <span className="text-red-500 text-lg">*</span>
      </label>
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 min-h-[42px]">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-md"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="text-blue-800 dark:text-blue-100 hover:text-blue-600 dark:hover:text-blue-300"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleAddTag}
          onBlur={onBlur}
          placeholder="Type and press Enter to add tags"
          className="flex-grow min-w-[120px] outline-none bg-transparent text-gray-900 dark:text-gray-100"
        />
      </div>
    </div>
  )
}

export default AddTags

