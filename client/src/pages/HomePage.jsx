import React, { useEffect } from 'react'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideos } from '../store/slices/videoSlice'
import { VideoList } from '../components'
import { Link } from 'react-router-dom'

function HomePage() {
    const dispatch = useDispatch()
    const videos = useSelector((state) => state.video?.videos?.docs)

    useEffect(() => {
        dispatch(getAllVideos({}))
    }, [dispatch])

    return (
        <Container>

            <div className="text-white sm:h-[90vh] h-[80vh] border w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 overflow-y-scroll">
                {videos?.map((video) => (
                    <Link
                        to={`/watch/${video._id}`}
                        key={video._id}
                    >
                        <VideoList
                            avatar={video.ownerDetails?.avatar?.url}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail?.url}
                            views={video.views}
                            channelId={video.owner}
                            channelName={video.ownerDetails.username}
                            createdAt={video.createdAt}
                        />
                    </Link>
                ))}
            </div>
        </Container>
    )
}

export default HomePage
