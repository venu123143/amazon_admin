import { useState, CSSProperties, useEffect } from "react"
import { BsArrowLeftShort } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"
import { BarLoader } from "react-spinners"
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux"
import { object, string } from 'yup';


import CustomInput from "../../components/CustomInput"
import { forgotPassword, login } from "../../Redux/Reducers/auth/AuthSlice"
import { AppDispatch, RootState } from "../../Redux/Store"

let userSchema = object({
  email: string().email('Email should be valid').required('Email is Required'),
  password: string().required('Password is Required')

});
const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { message, user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)
  const [forgotpassword, setForgotPassword] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (user !== null) {
      navigate('/admin')
    }
  }, [message, user, isLoading, isError, isSuccess])



  const handleSubmit = () => {
    dispatch(forgotPassword(email))
    setEmail("")
    if (isSuccess === true) navigate('/')
  }
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    width: 380,
    borderRadius: "30px"
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: userSchema,
    onSubmit: values => {
      dispatch(login(values))
    },
  });
  return (
    <section className="bg-skin-background text-skin-base w-full">
      <Link to="/" className="absolute top-2 left-2 text-[#777777] flex items-center hover:text-black">
        <BsArrowLeftShort size={28} className="inline" />
        <button>back to home</button>
      </Link>
      <div className="flex justify-center items-center h-screen 400px:mx-5 py-5">
        <div className=" w-full flex justify-center">
          <div className="w-full bg-white rounded-lg shadow-lg border  dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <BarLoader
              color="#361AE3"
              loading={isLoading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {forgotpassword === true ? (
                <>
                  <div>
                    <h1 className="text-lg font-medium leading-tight text-center tracking-tight text-skin-base md:text-xl dark:text-white">
                      Reset your password
                    </h1>
                    <p className="font-light text-center text-[#777777] mb-2">we will send you an email to reset your password</p>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your email</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)} value={email}
                      type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your email" required />

                    <div className="text-center">
                      <button onClick={handleSubmit} className="bg-skin-light text-skin-background hover:text-skin-backgroundLight hover:bg-skin-main shadow-lg my-[10px] text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                        submit
                      </button> <br />
                      <button onClick={() => setForgotPassword(false)} className="hover:underline text-black dark:text-white  my-[10px] text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login
                  </h1>
                  <form className="space-y-2" action="#" onSubmit={formik.handleSubmit}>
                    <CustomInput
                      placeholder="Enter your email"
                      onChange={formik.handleChange('email')}
                      value={formik.values.email}
                      name="email" id="email"
                      type="text" classname="email" />

                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 text-[14px] ">{formik.errors.email}</div>
                    ) : null}

                    <CustomInput
                      placeholder="Enter your Password"
                      onChange={formik.handleChange('password')}
                      value={formik.values.password}
                      name="password" id="password"
                      type="password" classname="password" />

                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 text-[14px] ">{formik.errors.password}</div>
                    ) : null}

                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div onClick={() => setForgotPassword(true)} className="text-sm dark:text-white font-medium hover:underline ">Forgot password?</div>
                      </div>
                      <Link to="/otplogin" className="text-sm font-medium dark:text-white hover:underline dark:text-primary-500">
                        Login with OTP
                      </Link>
                    </div>
                    <div className="flex justify-evenly w-full">
                      <button type="submit" className="bg-[#ffd333] text-center button w-full my-[10px] font-[400] tracking-wider py-[6px] text-[1.2rem] rounded-[5px]">
                        sign-in
                      </button>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-[#777777] hover:underline">don't have an account ? </span>
                      <Link to="/register" className="text-md font-medium  hover:underline ">
                        Sign Up
                      </Link>
                    </div>
                  </form>
                  <div className="flex items-center justify-center my-2">
                    <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      <FcGoogle size={25} className="inline mr-2" />
                      <span>Continue with Google</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default LoginPage