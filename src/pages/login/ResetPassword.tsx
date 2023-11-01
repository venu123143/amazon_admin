import { CSSProperties } from "react"
import { BsArrowLeftShort } from "react-icons/bs"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BarLoader } from "react-spinners"
import CustomInput from "../../components/CustomInput"
import { useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../Redux/Store"
import { useFormik } from "formik"
import { object, string } from "yup"
import { resetPassword } from "../../Redux/Reducers/auth/AuthSlice"
import { useDispatch } from "react-redux"

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  width: 380,
  borderRadius: "30px"
};
const passwordSchema = string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
    'password contain atleast {1} uppercase, lowecase, one number, one symbol and mininum 8 chars long.'
  )
  .required('Password is Required');

let ResetSchema = object({
  password: passwordSchema,
  confirmPassword: string()
    .test('passwords-match', 'Passwords does not match', function (value) {
      return this.parent.password === value;
    })
    .required('Confirm Password is required'),
});
const ResetPassword = () => {
  const { isLoading, isSuccess } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const tokenId = useParams()
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetSchema,
    onSubmit: values => {
      console.log("submit");
      
      dispatch(resetPassword({ password: values.password, token: tokenId.id as string }))
      formik.resetForm()
      if (isSuccess === true) {
        navigate('/')
      }
    },
  });
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
            loading={isLoading}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="p-6 space-y-1 md:space-y-1 sm:p-8">
            <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create New Password
            </h1>
            <form action="#" className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <CustomInput
                onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")} value={formik.values.password}
                id="forgotpassword" classname="forgotpassword" type="password" placeholder="Enter your password" />
              <CustomInput
                onChange={formik.handleChange("confirmPassword")} onBlur={formik.handleBlur("confirmPassword")} value={formik.values.confirmPassword}
                id="forgotpassword" classname="forgotpassword" type="password" placeholder="Re-Enter your password" />
              <div className="">
                <button type="submit" className="w-full bg-[#ffd333] hover:bg-gradient-to-r from-indigo-600 to-red-600 hover:text-white text-lg tracking-wider  py-[6px] rounded-[5px]">
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