import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './index'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, getCurrentUser, createAccount } from '../store/slices/authSlice'
import { toast } from 'react-hot-toast'
import { closeLoginModal } from '../store/slices/uiSlice';
import LoginSkeleton from '../skeleton/LoginSkeleton.jsx'

function Login() {

  const { handleSubmit, register, formState: { errors }, reset } = useForm()

  const navigation = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth?.loading)
  const [formState, setFormState] = useState("login")

  const submit = async (data) => {
    try {
      let res;
      if (formState === "login") {
        const isEmail = data.username.includes('@')
        const loginData = isEmail ? { email: data.username, password: data.password } : { username: data.username, password: data.password }
        res = await dispatch(userLogin(loginData)).unwrap()
      } else {
        const formData = new FormData()
        formData.append("fullName", data.fullName)
        formData.append("username", data.username)
        formData.append("email", data.email)
        formData.append("password", data.password)
        if (data.avatar[0]) {
          formData.append("avatar", data.avatar[0])
        }
        res = await dispatch(createAccount(formData)).unwrap()
      }
      if (res) {
        toast.success(`User ${formState === "login" ? "logged in" : "registered"} successfully!`)
        // await dispatch(getCurrentUser())
        dispatch(closeLoginModal())
        navigation("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    dispatch(closeLoginModal())
    reset()
  }

  const toggleFormState = (state) => {
    setFormState(state)
    reset()
  }

  if (loading) {
    return <LoginSkeleton />
  }

  return (
    <div onClick={handleClose} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'>
      <form onSubmit={handleSubmit(submit)} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User </span>{formState === "login" ? "Login" : "Sign Up"}
        </p>

        {formState === "register" && (
          <>
            <Input label="Full Name:" type="text" placeholder="Your full name"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
          </>
        )}

        <Input label={formState === 'login' ? "Username or Email:" : "Username:"} type="text" placeholder={formState === 'login' ? "username or email" : "username"}
          {...register("username", { required: true })}
        />
        {errors.username && <span className="text-red-500">{errors.username.message}</span>}

        {formState === "register" && (
          <>
            <Input label="Email:" type="email" placeholder="example@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </>
        )}

        <Input label="Password:" type="password" placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

        {formState === "register" && (
          <Input label="Avatar:" type="file" accept="image/png, image/jpeg"
            {...register("avatar")}
          />
        )}

        <button type='submit' className="bg-blue-600 hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {formState === "login" ? "Login" : "Create Account"}
        </button>

        {formState === "login" ? (
          <p>
            Create an account? <span onClick={() => toggleFormState("register")} className="text-primary cursor-pointer">click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => toggleFormState("login")} className="text-primary cursor-pointer">click here</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default Login
