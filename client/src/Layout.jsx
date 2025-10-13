import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function Layout() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1'>
                <Sidebar />
                <div className='flex-1 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
