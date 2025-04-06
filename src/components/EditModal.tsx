
import { RxCross2 } from "react-icons/rx"
import CustomInput from "./CustomInput" // IMPORTANT: Make sure CustomInput also supports dark mode

interface EditModalProps {
  /** Function to control the modal's visibility state */
  openModal: (isOpen: boolean) => void;

  /** Boolean state indicating if the modal is currently open */
  modal: boolean;

  /** String used for the modal title and potentially input identification */
  title: string;

  /** Function to handle the form submission event */
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  /**
   * Function to handle the change event from the CustomInput.
   * Adjust the event type if CustomInput wraps something other than input/textarea.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  /**
   * Function to handle the blur event from the CustomInput.
   * Adjust the event type if CustomInput wraps something other than input/textarea.
   */
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  /** The current value for the CustomInput */
  value: string; // Assuming the input value is always a string. Change to string | number if needed.
}


const EditModal = ({ openModal, modal, title, onSubmit, onChange, onBlur, value }: EditModalProps) => {
  console.log(value);

  return (
    <div>
      {/* Modal Content */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 transition-all ease-in ${modal === true ? "scale-100 duration-200" : "scale-0 duration-200"} p-4 bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-auto rounded-md shadow-lg dark:shadow-xl min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]`} // Added dark:bg-gray-800, shadow-lg, dark:shadow-xl
        id={title} // Consider using a more unique ID if multiple modals can exist
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b rounded-t dark:border-gray-600"> {/* Added border styles */}
          <h5
            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-100" // Adjusted dark text color for consistency
            id={`${title}-modal-label`} // Made ID slightly more specific
          >
            Edit {title}
          </h5>
          <button
            type="button"
            onClick={() => openModal(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" // Dark mode hover states look good
            aria-label="Close modal" // Added aria-label
          >
            <RxCross2 size={20} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="pt-4"> {/* Added padding top */}
          <form className="p-4 space-y-3" onSubmit={onSubmit}>
            <CustomInput id={title} name={title} placeholder={`Edit ${title}`} onChange={onChange} onBlur={onBlur} value={value} />
            <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
              Edit {title}
            </button>
          </form>
        </div>
      </div>

      {/* Backdrop Overlay */}
      <div
        onClick={() => openModal(false)}
        className={`${modal === true ? "block delay-75" : "hidden"} transition-all ease-in absolute top-0 left-0 z-40 bg-black/50 dark:bg-black/60 w-full h-screen cursor-pointer`} // Adjusted opacity, added cursor
      >
      </div>
    </div>
  )
}

export default EditModal