import React, { CSSProperties } from "react"
import { RxCross2 } from "react-icons/rx"
import { AppDispatch, RootState } from "../Redux/Store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAllOrders, openModal, updateOrder } from "../Redux/Reducers/orders/orderSlice"
import StatusInput from "./StatusInput" // Make sure StatusInput also supports dark mode
import { SyncLoader } from "react-spinners"

const OrderModal = ({ status, title, id }: any) => {

  // Keep override as is, it's for the loader positioning
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red", // Note: This color won't change unless you handle it differently
    width: 380,
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: 'translateX(-50%, -50%)' // Typo corrected: Should be 'translate(-50%, -50%)' or separate X/Y
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
      {/* Modal Content */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-20 transition-all ease-in ${modal === true ? "scale-100 duration-200" : "scale-0 duration-200"} p-4 bg-white dark:bg-gray-800 overflow-x-hidden overflow-y-auto min-h-[400px] rounded-md shadow-lg dark:shadow-xl min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]`} // Added dark:bg-gray-800, shadow-lg, dark:shadow-xl
        id={title} // Consider using a more unique ID if multiple modals can exist
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b rounded-t dark:border-gray-600"> {/* Added border styles */}
          <h5
            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-100" // Changed dark text color
            id="exampleModalLgLabel" // Consider making this dynamic if title changes
          >
            Edit {title}
          </h5>
          <button
            type="button"
            onClick={() => dispatch(openModal(false))}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" // Dark mode hover states already look good
            aria-label="Close modal" // Added aria-label for accessibility
          >
            <RxCross2 size={20} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="pt-4"> {/* Added padding top */}
            <p className="font-Rubik text-gray-600 dark:text-gray-400 mb-4"> {/* Changed text colors, added margin-bottom */}
                It will update your recently selected status only. Update each status separately.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}> {/* Added vertical spacing */}
                <div className="flex flex-wrap gap-4"> {/* Use flex-wrap for smaller screens, adjusted gap */}
                    {
                        status && status.map((each: any, indexNum: number) => ( // Renamed index to avoid conflict
                            // IMPORTANT: Ensure StatusInput component internally handles dark mode styles
                            <StatusInput key={indexNum} prop={each} index={indexNum} />
                        ))
                    }
                </div>

                <div className="pt-4"> {/* Add padding top for separation */}
                  <button
                    type="submit" // Explicitly set type="submit"
                    disabled={isLoading} // Disable button while loading
                    className='px-5 py-2 rounded-md bg-gradient-to-r from-slate-700 to-red-500 text-white transition-all ease-in duration-100 delay-75 hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 text-[1rem] font-Rubik font-medium disabled:opacity-50 disabled:cursor-not-allowed' // Adjusted hover scale, added focus rings, disabled styles
                  >
                    {isLoading ? 'Saving...' : `Edit ${title}`} {/* Show loading text */}
                  </button>
                </div>
            </form>
        </div>
      </div>

      {/* Loading Overlay */}
      {/* Consider making loader color dynamic based on theme */}
      <div className={`${isLoading === true ? "block bg-black/50 dark:bg-black/70 absolute top-0 left-0 z-40 w-full h-screen" : "hidden"}`}> {/* Adjusted opacity using bg-black/50 syntax */}
        <SyncLoader
          color="#FFFFFF" // Example: A color visible on the dark overlay
          loading={isLoading}
          cssOverride={override} // Check transform property here
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>

      {/* Backdrop Overlay */}
      <div
        onClick={() => !isLoading && dispatch(openModal(false))} // Prevent closing while loading
        className={`${modal === true ? "block delay-75" : "hidden"} transition-all ease-in absolute top-0 left-0 z-10 bg-black/50 dark:bg-black/60 w-full h-screen cursor-pointer`} // Adjusted opacity, added cursor
      >
      </div>
    </div>
  )
}

export default OrderModal;