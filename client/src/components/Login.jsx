import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './index'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogin, getCurrentUser } from '../store/authSlice'

function Login() {

  const { handleSubmit, register, formState: { errors } } = useForm()

  const navigation = useNavigate()
  const dispatch = useDispatch()

  const submit = async (data) => {
    const isEmail = data.username.includes('@')
    const loginData = isEmail ? { email: data.username, password: data.password } : data

    const res = await dispatch(userLogin(loginData))
    const user = await dispatch(getCurrentUser())

    if (user && res?.payload) {
      navigation("/")
    }
  }

  return (
    <div onClick={() => setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>"Login"
        </p>

        <Input label="username/email :" type="text" placeholder="example@gmail.com"
          {...register("username", { required: true })}
        />

        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        <Input label="password :" type="password" placeholder="1kalf030"
          {...register("password", { required: true })}
        />

        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <button type='submit' className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>

        <p>
          Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
        </p>

        {/* <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to={"/signup"}
            className="text-purple-600 cursor-pointer hover:opacity-70"
          >
            SignUp
          </Link>
        </p> */}
      </form>
    </div>
  )
}

export default Login
