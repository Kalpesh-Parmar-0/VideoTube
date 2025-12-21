import React, { useEffect } from 'react'
import { ChannelHeader } from "../components/index"
import { useDispatch, useSelector } from 'react-redux'
import { userChannelProfile } from '../store/slices/userSlice'

function Channel() {

    const dispatch = useDispatch()
    const channel = useSelector((state) => state.auth?.userData)
    const profile = useSelector((state) => state.user?.profileData)

    useEffect(() => {
        if (channel) {
            dispatch(userChannelProfile(channel?.username))
        }
    }, [dispatch, channel])

    return (
        <div>
            <ChannelHeader
                username={channel?.username}
                coverImage={profile?.coverImage.url}
                avatar={profile?.avatar.url}
                subscribedCount={profile?.channelsSubscribedToCount || 0}
                fullName={profile?.fullName}
                subscribersCount={profile?.subscribersCount || 0}
            >

            </ChannelHeader>
        </div>
    )
}

export default Channel
