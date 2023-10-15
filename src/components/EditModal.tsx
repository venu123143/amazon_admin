import { RxCross2 } from "react-icons/rx"
import CustomInput from "./CustomInput"

const EditModal = ({ openModal, modal, title, onSubmit, onChange, onBlur, value }: any) => {
  return (
    <div>
      <div className={`absolute top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2 w-full z-50 transition-all ease-in ${modal === true ? "scale-100 duration-200" : "scale-0 duration-200"}  p-4 bg-white overflow-x-hidden overflow-y-auto rounded-md min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] `}
        id={title}>
        <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalLgLabel">
          Edit {title}
        </h5>
        <button type="button" onClick={() => openModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <RxCross2 className="" size={20} />
          <span className="sr-only">Close modal</span>
        </button>

        <form className="p-4 space-y-3" onSubmit={onSubmit}>
          <CustomInput id={title} name={title} placeholder={`Edit ${title}`} onChange={onChange} onBlur={onBlur} value={value} />
          <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
            Edit {title}
          </button>
        </form>
      </div>
      <div onClick={() => openModal(false)} className={`${modal === true ? "block delay-75" : "hidden"} transition-all ease-in absolute top-0 left-0 z-40 bg-black opacity-50 w-full h-screen`}>
      </div>
    </div>
  )
}

export default EditModal