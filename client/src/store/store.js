import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice.js";
import uiReducer from "./uiSlice.js"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        ui: uiReducer,
    },
});

export default store;