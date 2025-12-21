import React from 'react'
import { formateDuration, timeAgo } from '../helpers/timeAgo'
import { Link } from 'react-router-dom'

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
    return (
        <>
            <div>
                <div>
                    <img src={thumbnail} alt="" />
                    <span>{formateDuration(duration)}</span>
                </div>

                <div>
                    <Link to={`/channel/${channelName}`}>
                        <img src={avatar} alt="" />

                    </Link>

                    <div>
                        <h2>{title}</h2>
                        <div>
                            <span>{views} Views</span>
                            <span>{timeAgo(createdAt)} years ago</span>
                        </div>
                        {channelName && (
                            <h2>{channelName}</h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoList
