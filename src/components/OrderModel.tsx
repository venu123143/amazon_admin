import React, { CSSProperties } from "react"
import { RxCross2 } from "react-icons/rx"
import { AppDispatch, RootState } from "../Redux/Store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAllOrders, openModal, updateOrder } from "../Redux/Reducers/orders/orderSlice"
import StatusInput from "./StatusInput"
import { SyncLoader } from "react-spinners"

const OrderModal = ({ status, title, id }: any) => {

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

  const { Status, index, modal, isLoading } = useSelector((state: RootState) => state.ord)

  const dispatch: AppDispatch = useDispatch()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateOrder({ id, Status, index })).then(() => {
      dispatch(getAllOrders())
    })
  }
  return (
    <div>
      <div className={`absolute top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2 w-full z-20 transition-all ease-in ${modal === true ? "scale-100 duration-200" : "scale-0 duration-200"}  p-4 bg-white overflow-x-hidden overflow-y-auto min-h-[400px] rounded-md min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] `}
        id={title}>
        <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
          id="exampleModalLgLabel">
          Edit {title}
        </h5>
        <p className=" font-Rubik text-[#777777] ">It will update your recently selected status only, So update Your each status seperately.</p>
        <button type="button" onClick={() => dispatch(openModal(false))} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <RxCross2 className="" size={20} />
          <span className="sr-only">Close modal</span>
        </button>
        <form className="p-4 space-y-3" onSubmit={handleSubmit}>
          <div className="flex gap-5">
            {
              status && status.map((each: any, index: number) => (
                <StatusInput key={index} prop={each} index={index} />
              ))
            }
          </div>

          <button className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-110 hover:shadow-lg hover:border text-[1rem] font-Rubik font-medium'>
            Edit {title}
          </button>
        </form>
      </div >

      <div className={`${isLoading === true ? "block bg-black opacity-50 absolute top-0 left-0  z-40 w-full h-screen" : "hidden"}`}>
        <SyncLoader
          color="#361AE3"
          loading={isLoading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div onClick={() => dispatch(openModal(false))} className={`${modal === true ? "block delay-75" : "hidden"} transition-all ease-in absolute top-0 left-0 z-10 bg-black opacity-50 w-full h-screen`}>
      </div>
    </div >
  )
}

export default OrderModal