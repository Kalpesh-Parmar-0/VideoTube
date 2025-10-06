import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../helpers/axiosInstance';
import toast from 'react-hot-toast';


const initialState = {
    status: false,
    userData: null,
    accessToken: null,
    refreshToken: null,
};

export const createAccount = createAsyncThunk("register", async (data) => {
    try {
        const res = await axiosInstance.post("/users/register", data)
        // toast.success(res.data.data.message) // may be true is toat.success(res.data.message)
        console.log(res.data);
        return res.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        const res = await axiosInstance.post("/users/login", data)
        // toast.success(res.data.data.message)
        console.log(res.data);
        return res.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const res = await axiosInstance.post("/users/logout")
        // toast.success(res.data.data.message)
        return res.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const refreshAccessToken = createAsyncThunk("refreshAccessToken", async (data) => {
    try {
        const res = await axiosInstance.post("/users/refresh-token", data)
        // console.log(res.data);
        return res.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

export const changePassword = createAsyncThunk("changePassword", async (data) => {
    try {
        const res = await axiosInstance.post("/users/change-password", data)
        toast.success(res.data.data)
        // console.log(res.data);
        return res.data
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = true
                state.userData = action.payload.data.user
                state.accessToken = action.payload.data.accessToken
                state.refreshToken = action.payload.data.refreshToken
            }
            )
    }
})

// export const { updateUser } = authSlice.actions
export default authSlice.reducer;