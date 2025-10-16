import React from 'react'

function VideoList({
    thumbnail,
    duration,
    title,
    views,
    avatar,
    channelName,
    description,
    createdAt,
}) {
    return (
        <>
            <div>
                <div>
                    <img src={thumbnail} alt="" />
                    <span>{duration}</span>
                </div>

                <div>
                    {avatar && (
                        <img src={avatar} alt="" />
                    )}

                    <div>
                        <h2>{title}</h2>
                        <div>
                            <span>{views} Views</span>
                            <span>{createdAt} years ago</span>
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
