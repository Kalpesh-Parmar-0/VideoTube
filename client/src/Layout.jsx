import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function Layout() {
    return (
        <div className='min-h-screen overflow-auto h-[100vh]'>
            <Navbar />
            <div>
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
