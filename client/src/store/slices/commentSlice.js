import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const initialState = {
    loading: false,
    comments: []
}

export const createAcomment = createAsyncThunk("createAcomment", async({videoId, content})=> {
    try {
        const res = await axiosInstance.post(`/comment/${videoId}`, content)
        console.log(res.data.data);
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const editAcomment = createAsyncThunk("editAcomment", async({commnetId, content})=> {
    try {
        const res = await axiosInstance.patch(`/comment/channel/${commnetId}`, content)
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const deleteAcomment = createAsyncThunk("deleteAcomment", async({commnetId})=> {
    try {
        const res = await axiosInstance.delete(`/comment/channel/${commnetId}`)
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const getVideoComments = createAsyncThunk("getVideoComments", async({videoId, page, limit})=> {

    const url = new URL(`${BASE_URL}/comment/${videoId}`)
    if (page) url.searchParams.set('page',page)
    if (limit) url.searchParams.set('limit', limit)

    try {
        const res = await axiosInstance.get(url)
        console.log(res.data.data)
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideoComments.pending, 
            (state)=> (state.loading = true)
        )

        builder.addCase(getVideoComments.fulfilled,
            (state, action) => {
                state.loading = false
                state.comments = action.payload
            }
        )

        builder.addCase(createAcomment.fulfilled, (state, action) => {
            state.comments.unshift(action.payload)
        })
    }
})

export default commentSlice.reducer