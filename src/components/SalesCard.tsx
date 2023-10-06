import { useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { RxArrowTopRight } from "react-icons/rx"
import { GoArrowDownRight } from "react-icons/go"

const SalesCard = ({ title, value }: any) => {
    const [sales, setSales] = useState(6);
    const [dropdown, setDropDown] = useState(false)
    console.log(dropdown);

    return (
        <div className="p-2 border hover:border-none cursor-pointer transition-all delay-75 duration-300 hover:scale-95 bg-gradient-to-r from-gray-100 to-slate-100 hover:bg-gradient-to-r hover:from-slate-300 hover:to-green-400 flex flex-col gap-4 justify-between bg-white rounded-md shadow-md w-full">
            <div className="flex justify-between">
                <span className="text-[#777777]">{title}</span>
                <div onClick={() => setDropDown(!dropdown)} className="relative p-2 rounded-full">
                    <BiDotsVerticalRounded className="inline cursor-pointer" size={20} />
                    {
                        dropdown && (

                            <div id="dropdownHover" className="z-10 absolute to right-0  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex justify-between">
                <h3 className="font-Rubik font-[450] text-[1.52rem]">{value}</h3>
                <div>
                    <div className="flex justify-end">
                        {sales > 50 ? (
                            <>
                                <RxArrowTopRight className="inline justify-center items-center text-green-500 mr-2" size={20} />
                                <span className="font-[400] font-Rubik text-green-500">{sales}%</span>
                            </>
                        )
                            : (
                                <>
                                    <GoArrowDownRight className="inline justify-center items-center text-red-500 mr-2" size={20} />
                                    <span className="font-[400] font-Rubik text-red-500">{sales}%</span>
                                </>
                            )}

                    </div>
                    <p className="text-[#777777]">Compared to april 2021</p>
                </div>
            </div>
            {dropdown && <div className=" absolute top-0 left-0 right-0 bottom-0 " onClick={() => setDropDown(false)}></div>}
        </div>
    )
}

export default SalesCard