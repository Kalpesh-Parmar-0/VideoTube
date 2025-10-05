import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import Button from './Button';

import logo from "../../public/logo.png"

function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(false)

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
        <RiVideoAddLine className='text-2xl' />
        <AiOutlineBell className='text-2xl' />
        <CgProfile size={"32px"} className='rounded-full' />
      </div>
    </div>
  )
}

export default Navbar
