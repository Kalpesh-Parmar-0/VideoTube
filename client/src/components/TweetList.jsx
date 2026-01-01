import React, {useState} from 'react'
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi'
import {toggleTweetLike} from "../store/slices/likeSlice"
import { timeAgo } from '../helpers/timeAgo'
import { useDispatch } from 'react-redux'

function TweetList({
    tweetId,
    avatar,
    username,
    createdAt,
    content,
    likesCount,
    isLiked
}) {

    const dispatch = useDispatch()
    const [localIsLiked, setLocalIsLiked] = useState(isLiked)
    const [localLikesCount, setLocalLikesCount] = useState(likesCount)

    const handleLikeToggle = () => {
        if(localIsLiked) {
            setLocalLikesCount(prev => prev-1)
        } else {
            setLocalLikesCount(prev => prev +1)
        }
        setLocalIsLiked(prev => !prev)
        dispatch(toggleTweetLike(tweetId))
    }

  return (
    <>
        <div>
            <div>
                <img 
                    src={avatar}
                />
            </div>
            <div>
                <div>
                    <h2>{username}</h2>
                    <span>
                        {timeAgo(createdAt)}
                    </span>
                </div>
                <p>{content}</p>
                <div>
                    <div>
                        <BiSolidLike />
                        <span>{localLikesCount}</span>
                    </div>
                    <BiSolidDislike />
                </div>
            </div>
        </div>
    </>
  )
}

export default TweetList