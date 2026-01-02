import React from 'react'
import { formateDuration, timeAgo } from '../helpers/timeAgo'
import { useNavigate } from 'react-router-dom'

function VideoList({
    thumbnail,
    duration,
    title,
    views = 0,
    avatar,
    channelName,
    createdAt,
    channelId
}) {
    const navigate = useNavigate()
    return (
        <>
            <div className='w-full sm:p-2'>
                <div className='relative sm:h-60 h-48'>
                    <img src={thumbnail} alt="" className='object-cover w-full h-full' />
                    <span className='absolute bottom-2 right-2 rounded-lg text-sm bg-black py-1 px-2'>
                        {formateDuration(duration)}
                    </span>
                </div>

                <div className='flex items-center py-2 px-2 gap-2'>
                    <img
                        src={avatar}
                        alt=""
                        className='w-10 h-10 rounded-full object-cover'
                        onClick={(e) => {
                            e.stopPropagation()
                            if (channelName) navigate(`/channel/${channelName}`)
                        }}
                        style={{ cursor: 'pointer' }}
                    />

                    <div>
                        <h2 className='font-medium'>{title}</h2>
                        <div className='text-xs space-x-1 text-slate-400'>
                            <span>{views} Views</span>
                            <span>{timeAgo(createdAt)}</span>
                        </div>
                        {channelName && (
                            <h2
                                className='text-xs space-x-1 text-slate-200'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/channel/${channelName}`)
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {channelName}
                            </h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoList
