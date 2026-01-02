import React, { useEffect } from 'react'
import { ChannelHeader } from "../components/index"
import { useDispatch, useSelector } from 'react-redux'
import { userChannelProfile } from '../store/slices/userSlice'
import { Outlet, useParams } from 'react-router-dom'

function Channel() {

    const dispatch = useDispatch()
    const channel = useSelector((state) => state.auth?.userData)
    const profile = useSelector((state) => state.user?.profileData)
    const params = useParams()
    const routeUsername = params?.username

    useEffect(() => {
        if (routeUsername) {
            dispatch(userChannelProfile(routeUsername))
        }
    }, [dispatch, routeUsername])

    return (
        <div>
            <ChannelHeader
                username={routeUsername}
                coverImage={profile?.coverImage?.url}
                avatar={profile?.avatar?.url}
                subscribedCount={profile?.channelsSubscribedToCount || 0}
                fullName={profile?.fullName}
                subscribersCount={profile?.subscribersCount || 0}
            />

            <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
                <Outlet />
            </div>
        </div>
    )
}

export default Channel
