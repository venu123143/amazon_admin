import { useState, CSSProperties } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BsArrowLeftShort } from "react-icons/bs"
import { Link } from "react-router-dom"
import { BarLoader } from "react-spinners"
import CustomInput from "../../components/CustomInput"
const ResetPassword = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: 380,
    borderRadius: "30px"
  };

  return (
    <div className="bg-[#FFFFF7] flex justify-center items-center h-screen py-5">
      <Link to="/" className="absolute top-2 left-2 text-[#777777] flex items-center hover:text-black">
        <BsArrowLeftShort size={28} className="inline" />
        <button>back to login</button>
      </Link>
      <div className="w-full flex justify-center">
        <div className="w-full bg-white rounded-lg shadow-lg border  dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <BarLoader
            color="#361AE3"
            loading={loading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="p-6 space-y-1 md:space-y-1 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create New Password
            </h1>
            <p className={`${error === true ? "block" : "hidden"} text-red-600`}>Min 1 (upper, lower, num, symbol)</p>
            <form action="#" className="space-y-4 md:space-y-6" >
              <CustomInput id="forgotpassword" classname="forgotpassword" type="password" placeholder="Enter your password" />
              <CustomInput id="forgotpassword" classname="forgotpassword" type="password" placeholder="Re-Enter your password" />
              <div className="">
                <button className="w-full bg-[#ffd333] hover:bg-gradient-to-r from-indigo-600 to-red-600 hover:text-white text-lg tracking-wider  py-[6px] rounded-[5px]">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword