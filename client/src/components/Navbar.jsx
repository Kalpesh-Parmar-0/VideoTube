import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal } from '../store/uiSlice';
import { userLogout } from '../store/authSlice';

import logo from "/logo.png"

function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const { status, userData } = useSelector((state) => state.auth)

  const handleLogin = () => {
    dispatch(openLoginModal())
  }

  const handleLogout = () => {
    dispatch(userLogout())
    setProfileMenuOpen(false)
  }

  return (
    <div className='flex justify-between px-6 py-2'>
      <div className='flex items-center space-x-4'>
        <AiOutlineMenu size={"40px"} className='cursor-pointer hover:bg-gray-200 duration-200 rounded-full p-2' />
        <img src={logo} alt="logo" className='w-28 cursor-pointer' />
      </div>

      <div className='flex items-center w-[35%]'>
        <div className='w-[100%] px-3 py-2 rounded-l-full border border-gray-200'>
          <input type="text" placeholder='Search' className='outline-none' />
        </div>
        <button className='px-4 py-2 bg-gray-200 rounded-r-full border border-gray-200'>
          <CiSearch size={"24px"} />
        </button>
        <IoMdMic size={"42px"} className='border border-gray-200 rounded-full p-2 ml-2 cursor-pointer hover:bg-gray-200 duration-200' />
      </div>

      <div className='flex space-x-5 items-center'>
        {status ? (
          <>
            <RiVideoAddLine className='text-2xl cursor-pointer' />
            <AiOutlineBell className='text-2xl cursor-pointer' />
            <div className='relative'>
              <img src={userData?.avatar?.url} alt={userData?.username} className='w-8 h-8 rounded-full cursor-pointer' onClick={() => setProfileMenuOpen(prev => !prev)} />

              {profileMenuOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                  <div className='px-4 py-2 text-sm text-gray-700'>
                    <p className='font-bold'>{userData?.fullName}</p>
                    <p className='text-gray-500'>@{userData?.username}</p>
                  </div>
                  <div className='border-t border-gray-200'></div>
                  <button onClick={handleLogout} className='block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button onClick={handleLogin} className='px-4 py-2 cursor-pointer bg-blue-700 text-white rounded-md flex items-center gap-2'>
            Login
          </button>
        )}
        {/* <CgProfile size={"32px"} className='rounded-full' /> */}
      </div>
    </div>
  )
}

export default Navbar
