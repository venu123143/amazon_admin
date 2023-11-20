import React, { useState, useEffect } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io';
import { AppDispatch, RootState } from '../Redux/Store';
import { useDispatch } from 'react-redux';
import { handleStatus } from '../Redux/Reducers/orders/orderSlice';
import { useSelector } from 'react-redux';
const StatusTypes = ["Ordered", "Processing", "Dispatched", "Delivered", "Returned", "Cancelled"]

const StatusInput = ({ prop, index }: any) => {

    const { modal } = useSelector((state: RootState) => state.ord)
    const dispatch: AppDispatch = useDispatch()
    const [openStatus, setOpenStatus] = useState<{ status: boolean, value: string }>({
        status: false,
        value: prop?.orderStatus
    });
    useEffect(() => {
        setOpenStatus({ status: false, value: prop?.orderStatus })
    }, [modal])
    useEffect(() => {
        // console.log("calling", "2");
        dispatch(handleStatus({ status: openStatus.value, index }))
    }, [openStatus.value, modal])

    return (
        <div className="relative">
            <button onClick={() => setOpenStatus({ ...openStatus, status: !openStatus.status })} id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 hidden z-10 md:flex items-center py-2.5 px-4 text-sm font-medium text-center  rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"> {openStatus.value} <IoMdArrowDropdown size={22} />
            </button>
            {
                openStatus.status &&
                (
                    <div className="z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black  focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                        <div className="py-1" role="none">
                            {StatusTypes && StatusTypes.map((status: string, index) => (
                                <div onClick={() => setOpenStatus({ ...openStatus, value: status, status: false })} key={index} className="cursor-pointer text-[1.2rem] py-2 font-[450] hover:text-black hover:bg-gray-200 bg-opacity-90 pl-5 my-2">{status}</div>
                            ))}
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default React.memo(StatusInput)