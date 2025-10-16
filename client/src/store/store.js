import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js";
import uiReducer from "./slices/uiSlice.js"
import userSliceReducer from "./slices/userSlice.js";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        ui: uiReducer,
        user: userSliceReducer
    },
});

export default store;