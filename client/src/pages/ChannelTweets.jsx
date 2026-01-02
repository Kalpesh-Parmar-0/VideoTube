import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TweetList from '../components/TweetList'
import { getUserTweets } from '../store/slices/tweetSlice'
import { Tweet } from '../components'

function ChannelTweets() {

    const dispatch = useDispatch()
    const authId = useSelector((state) => state.auth?.userData?._id)
    const userId = useSelector((state) => state.user?.profileData?._id)
    const tweets = useSelector((state) => state.tweet?.tweets)
    const loading = useSelector((state) => state.tweet?.loading)

    useEffect(()=> {
        if(userId) {
            dispatch(getUserTweets(userId))
        }
    }, [dispatch, userId])

  if (loading) return <h2>Loading...</h2>

  if (!tweets || tweets.length === 0) return <h2>No tweets found</h2>

  return (
    <>
        {authId === userId && <Tweet />}
        {
            tweets?.map((tweet) => (
                <TweetList 
                    key={tweet?._id}
                    avatar={tweet?.ownerDetails?.avatar.url}
                    content={tweet?.content}
                    createdAt={tweet?.createdAt}
                    likesCount={tweet?.likesCount}
                    tweetId={tweet?._id}
                    username={tweet?.ownerDetails?.username}
                    isLiked={tweet?.isLiked}
                />
            ))
        }
    </>
  )
}

export default ChannelTweets