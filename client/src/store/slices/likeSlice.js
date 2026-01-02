import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    loading: false,
    likedVideos: []
}

export const toggleVideoLike = createAsyncThunk("toggleVideoLike", async(videoId)=> {
    try{
        const res = await axiosInstance.post(`/likes/toggle/videos/${videoId}`)
        console.log(res.data.data);
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const toggleCommentLike = createAsyncThunk("toggleCommentLike", async(commnetId)=> {
    try{
        const res = await axiosInstance.post(`/likes/toggle/comment/${commnetId}`)
        console.log(res.data.data);
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const toggleTweetLike = createAsyncThunk("toggleTweetLike", async(tweetId)=> {
    try{
        const res = await axiosInstance.post(`/likes/toggle/tweet/${tweetId}`)
        console.log(res.data.data);
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const getLikedVideos = createAsyncThunk("getLikedVideos", async()=> {
    try{
        const res = await axiosInstance.get('/likes/videos/')
        console.log(res.data.data);
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.pending, (state) => state.loading = true)
        builder.addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false,
            state.likedVideos = action.payload
        })
    }
})

export default likeSlice.reducer