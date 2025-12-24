import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from 'react-hot-toast';
import { BASE_URL } from "../../constants";

const initialState = {
    loading: false,
    video: null,
    isPublished: null,
}

export const getAllVideos = createAsyncThunk("getVideos", async ({ userId, sortBy, sortType, query, page, limit }) => {
    try {
        // const baseURL = "http://localhost:3000/api/v1/videos"
        const url = new URL(`${BASE_URL}/videos`)

        if (userId) url.searchParams.set("userId", userId)
        if (query) url.searchParams.set("query", query)
        if (page) url.searchParams.set("page", page)
        if (limit) url.searchParams.set("limit", limit)
        if (sortBy && sortType) {
            url.searchParams.set("sortBy", sortBy)
            url.searchParams.set("sortType", sortType)
        }

        const res = await axiosInstance.get(url)
        console.log(res.data.data.docs);

        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const publishAvideo = createAsyncThunk("publishAvideo", async(data)=> {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("thumbnail", data.thumbnail[0])
    formData.append("videoFile", data.videoFile)

    try {
        const res = await axiosInstance.post('/videos',formData)
        console.log(res.data.data);
        toast.success(res?.data?.message)
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const updateAvideo = createAsyncThunk("updateAvideo", async(data)=> {
    const formData = FormData();
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("thumbnail", data.thumbnail[0])

    try {
        const res = await axiosInstance.patch(`/videos/video/${data.videoId}`,formData)
        console.log(res.data.data);
        toast.success(res?.data?.message)
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const deleteAvideo = createAsyncThunk("deleteAvideo", async(videoId)=> {
    try {
        const res = await axiosInstance.delete(`/videos/video/${videoId}`)
        console.log(res.data.data);
        toast.success(res?.data?.message)
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const getVideoById = createAsyncThunk("getVideoById", async(videoId)=> {
    try {
        const res = await axiosInstance.get(`/videos/video/${videoId}`)
        console.log(res.data.data);
        toast.success(res?.data?.message)
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const togglePublishStatus = createAsyncThunk("togglePublishStatus", async(videoId)=> {
    try {
        const res = await axiosInstance.get(`/videos/toggle-publish/${videoId}`)
        console.log(res.data.data.isPublished);
        toast.success(res?.data?.message)
        return res.data.data.isPublished
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false
            state.videos = action.payload
        })

        builder.addCase(publishAvideo.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(publishAvideo.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(updateAvideo.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateAvideo.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(deleteAvideo.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteAvideo.fulfilled, (state) => {
            state.loading = false;
        });

        builder.addCase(getVideoById.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false;
            state.video = action.payload;
        });

        builder.addCase(togglePublishStatus.fulfilled, (state, action) => {
            state.isPublished = action.payload;
        });
    }
})

export default videoSlice.reducer;