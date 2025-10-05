import React from 'react'
import { FaChevronRight } from "react-icons/fa6";

function SidebarSection({ title, items, showArrow = false }) {
    return (
        <div className='mt-4 space-y-2 items-center'>
            {title && (
                <div className='flex items-center space-x-2'>
                    <h1 className='font-semibold'>{title}</h1>
                    {showArrow && <FaChevronRight />}
                </div>
            )}

            {items.map((item) => (
                <div key={item.id} className='flex items-center space-x-6 hover:bg-gray-300 duration-300 rounded-xl p-1'>
                    <div className="text-xl cursor-pointer">{item.icon}</div>
                    <span className="cursor-pointer">{item.name}</span>
                </div>
            ))}

        </div>
    )
}

export default SidebarSection
