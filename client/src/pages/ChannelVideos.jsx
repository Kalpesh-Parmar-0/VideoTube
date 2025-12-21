import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideos } from '../store/slices/videoSlice'
import { VideoList } from '../components/index'
import { Link } from 'react-router-dom'

function ChannelVideos() {
    const dispatch = useDispatch()
    const videos = useSelector((state) => state.video?.videos?.docs)
    const userId = useSelector((state) => state.user?.profileData?._id)

    useEffect(() => {
        dispatch(getAllVideos({ userId }))
    }, [dispatch, userId])

    if (videos?.length === 0) return <h2>No videos found</h2>

    return (
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 gap-4 p-4'>
            {videos?.map((video) => (
                <Link
                    to={`watch/${video._id}`}
                    key={video._id}
                >
                    <VideoList
                        avatar={video.avatar?.url}
                        duration={video.duration}
                        title={video.title}
                        thumbnail={video.thumbnail?.url}
                        createdAt={video.createdAt}
                        views={video.views}
                    />
                </Link>
            ))}
        </div>
    )
}

export default ChannelVideos
