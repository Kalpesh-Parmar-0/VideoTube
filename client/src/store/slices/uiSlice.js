import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoginModalOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.isLoginModalOpen = true;
        },
        closeLoginModal: (state) => {
            state.isLoginModalOpen = false;
        },
    },
});

export const { openLoginModal, closeLoginModal } = uiSlice.actions;
export default uiSlice.reducer;

// this file is for UI mainly login related actions like login component show or not.