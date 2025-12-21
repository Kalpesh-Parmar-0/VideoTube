import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from 'react-hot-toast';
import { BASE_URL } from "../../constants";

const initialState = {
    loading: false,
    videos: [],
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
    }
})

export default videoSlice.reducer;