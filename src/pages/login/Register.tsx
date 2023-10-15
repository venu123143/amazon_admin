// import React from 'react'
import { useState, CSSProperties } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsArrowLeftShort } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BarLoader } from "react-spinners"
import { RootState } from "../../Redux/Store"

const SignUpPage = () => {
  const [visible, setVisible] = useState(false)
  const { isLoading } = useSelector((state: RootState) => state.auth)

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: 380,
    borderRadius: "30px"
  };

  return (
    <section className="bg-[#FFFFF7] w-full">
      <Link to="/" className="absolute top-2 left-2 text-[#777777] flex items-center hover:text-black">
        <BsArrowLeftShort size={28} className="inline" />
        <button>back to home</button>
      </Link>
      <div className="flex justify-center items-center h-screen 400px:mx-5 py-5">
        <div className=" w-full  flex justify-center">
          <div className="w-full bg-white rounded-lg shadow-lg border  dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <BarLoader
              color="#361AE3"
              loading={isLoading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <>
                <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Register
                </h1>
                <form className="space-y-2   md:space-y-4" action="#">
                  <div>
                    <input type="text" name="firstname" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your firstname" required />
                  </div>
                  <div>
                    <input type="text" name="lastname" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your lastname" required />
                  </div>
                  <div>
                    <input type="tel" name="mobile" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your Phone No" required />
                  </div>
                  <div>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your email" required />
                  </div>
                  <div className="relative">
                    <input type={`${visible === true ? "text" : "password"}`} name="password" id="password" placeholder="Enter your password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <div onClick={() => setVisible(!visible)} className="absolute top-2 right-3 cursor-pointer">
                      {visible === true ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
                    </div>
                  </div>
                  <div className="flex justify-evenly">
                    <button className="button my-[10px] text-white text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                      Register
                    </button>
                    <Link to="/" className="bg-[#febd69] hover:bg-[#232f3e] hover:text-white text-black my-[10px] text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                      Login
                    </Link>
                  </div>
                </form>
              </>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default SignUpPage