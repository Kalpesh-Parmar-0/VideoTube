import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice.js";
import uiReducer from "./uiSlice.js"
import userSliceReducer from "./userSlice.js";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        ui: uiReducer,
        user: userSliceReducer
    },
});

export default store;