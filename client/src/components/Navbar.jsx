import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../../public/logo.png"

function Navbar() {
  return (
    <div className='flex justify-between px-6 py-2'>
      <div className='border flex items-center space-x-4'>
        <AiOutlineMenu className='text-2xl cursor-pointer' />
        <img src={logo} alt="logo" className='w-28 cursor-pointer' />
      </div>
      <div className='border'>2</div>
      <div className='border'>3</div>
    </div>
  )
}

export default Navbar
