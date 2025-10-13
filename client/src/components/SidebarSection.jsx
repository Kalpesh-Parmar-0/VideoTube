import React from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

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
                {items.map((item) => {
                    const content = (
                        <div div key={item.id} className='flex cursor-pointer items-center space-x-6 hover:bg-gray-300 duration-300 rounded-lg p-1' >
                            <div className="text-xl ">{item.icon}</div>
                            <span className="">{item.name}</span>
                        </div>
                    )

                    return (
                        <li key={item.id}>
                            {item.path ? (
                                <Link to={item.path}>{content}</Link>
                            ) : (
                                content
                            )}
                        </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default SidebarSection
