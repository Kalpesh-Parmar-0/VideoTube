import React from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

function SidebarSection({ title, items, showArrow = false }) {
    return (
        <div className='mt-4 space-y-2 items-center'>
            {title && (
                <div className='flex items-center space-x-2'>
                    <h1 className='font-semibold'>{title}</h1>
                    {showArrow && <FaChevronRight />}
                </div>
            )}

            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.path ? (
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `flex items-center space-x-6 rounded-lg duration-300 hover:bg-gray-200 p-1 ${isActive ? 'bg-gray-200 font-semibold' : ''}`}
                            >
                                <div className="text-xl ">{item.icon}</div>
                                <span className="">{item.name}</span>
                            </NavLink>
                        ) : (
                            <div key={item.id} className='flex cursor-pointer items-center space-x-6 hover:bg-gray-200 duration-300 rounded-lg p-1' >
                                <div className="text-xl ">{item.icon}</div>
                                <span className="">{item.name}</span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default SidebarSection
