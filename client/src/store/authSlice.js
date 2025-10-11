import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../helpers/axiosInstance';
import toast from 'react-hot-toast';


const initialState = {
    loading: false,
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
        return res.data.data
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
        return res.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message)
        console.log(error.message);

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

export const refreshAccessToken = createAsyncThunk("refreshAccessToken", async () => {
    try {
        const res = await axiosInstance.post("/users/refresh-token")
        // console.log(res.data);
        return res.data
    } catch (error) {
        // toast.error(error?.response?.data?.error)
        console.log("Failed to refresh access token", error);
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

export const getCurrentUser = createAsyncThunk("getCurrentUser", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("/users/current-user");
        return res.data;
    } catch (error) {
        console.log("User is not logged in");
        return rejectWithValue(error.response.data)
    }
})

export const refreshAndFetchUser = createAsyncThunk("auth/refreshAndFetchUser", async (_, { dispatch, rejectWithValue }) => {
    try {
        await dispatch(refreshAccessToken()).unwrap()

        const user = await dispatch(getCurrentUser()).unwrap()
        return user
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false
            state.status = true
            state.userData = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        })

        builder.addCase(userLogin.pending, (state) => {
            state.loading = true
        })

        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false
            state.status = true
            state.userData = action.payload.user
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        })

        builder.addCase(userLogout.pending, (state) => {
            state.loading = true
        })

        builder.addCase(userLogout.fulfilled, (state) => {
            state.loading = false
            state.status = false
            state.userData = null
        })

        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false
            state.status = true
            state.userData = action.payload.data
        })

        builder.addCase(getCurrentUser.rejected, (state) => {
            state.loading = false
            state.status = false
            state.userData = null
        })

        builder.addCase(refreshAndFetchUser.pending, (state) => {
            state.loading = true
        })

        builder.addCase(refreshAndFetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.status = true
            state.userData = action.payload.data
        })

        builder.addCase(refreshAndFetchUser.rejected, (state) => {
            state.loading = false
            state.status = false
            state.userData = null
        })

        builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.accessToken = action.payload.data.accessToken
            state.refreshToken = action.payload.data.refreshToken
        })

    }
})

// export const { updateUser } = authSlice.actions
export default authSlice.reducer;

// this file is mainly for authentication related actions.