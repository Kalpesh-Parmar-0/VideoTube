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
            <div>
                <div>
                    <img src={thumbnail} alt="" />
                    <span>{formateDuration(duration)}</span>
                </div>

                <div>
                    <img
                        src={avatar}
                        alt=""
                        onClick={(e) => {
                            e.stopPropagation()
                            if (channelName) navigate(`/channel/${channelName}`)
                        }}
                        style={{ cursor: 'pointer' }}
                    />

                    <div>
                        <h2>{title}</h2>
                        <div>
                            <span>{views} Views</span>
                            <span>{timeAgo(createdAt)} years ago</span>
                        </div>
                        {channelName && (
                            <h2
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
