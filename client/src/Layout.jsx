import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function Layout() {
    return (
        <>
            <Navbar />
            <div>
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
