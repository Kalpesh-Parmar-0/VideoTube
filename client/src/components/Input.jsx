import React, { useId } from 'react'

const Input = React.forwardRef((
    { label, type = "text", placeholder, className = "", ...props },ref
) => {

    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label className='' htmlFor={id}>{label}</label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`border border-gray-200 rounded w-full p-2 mt-1 outline-primary ${className}`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    )
})

export default Input
