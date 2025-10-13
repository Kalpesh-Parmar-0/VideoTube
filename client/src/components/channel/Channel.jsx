import React from 'react'
import { Button } from '../index'
import { NavLink } from 'react-router-dom'

function Channel({
    coverImage,
    avatar,
    username,
    fullName,
    subscribersCount,
    subscribedCount,
}) {
    return (
        <div className='h-full m-5 overflow-x-hidden'>
            <section className='w-full'>
                <img src={coverImage} alt={username} className='sm:h-60 w-full object-cover rounded-2xl' />
            </section>

            <section className='sm:px-5 p-4 flex sm:flex-row flex-col sm:items-end items-start w-full sm:gap-4 m-8'>

                <img src={avatar} alt={username} className='w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover  -mt-20 -ml-5 outline-none' />

                <div className='w-full md:h-24 sm:h-20 flex justify-between items-start px-1'>
                    <div>
                        <h1 className='text-xl font-bold'>{username}</h1>
                        <h3 className='text-sm text-slate-400'>@{fullName}</h3>

                        <div className='flex gap-1'>
                            <p className='text-xs text-slate-400'>
                                {subscribersCount} subscribers
                            </p>
                            <p className='text-xs text-slate-400'>
                                {subscribedCount} subscribed
                            </p>
                        </div>
                    </div>
                    <div>
                        <Button className='border-slate-500 mr-5'>Edit</Button>
                    </div>
                </div>
            </section>

            <section className='w-150 flex justify-evenly items-center border-b-2 border-slate-300 text-sm sm:text-base sm:mt-4 md:mt-0 mt-2'>
                <NavLink
                    to={"/my-content/videos"}
                    className={({ isActive }) => isActive ? 'font-bold border-b-2' : 'text-stone-400'}
                >Videos</NavLink>
                <NavLink
                    to={"/my-content/playlists"}
                    className={({ isActive }) => isActive ? 'font-bold border-b-2' : 'text-stone-400'}
                >Playlists</NavLink>
                <NavLink
                    to={"/my-content/subscribed"}
                    className={({ isActive }) => isActive ? 'bfont-bold border-b-2' : 'text-stone-400'}
                >Subscribed</NavLink>
                <NavLink
                    to={"/my-content/tweets"}
                    className={({ isActive }) => isActive ? 'font-bold border-b-2' : 'text-stone-400'}
                >Tweets</NavLink>
            </section>

        </div>
    )
}

export default Channel
