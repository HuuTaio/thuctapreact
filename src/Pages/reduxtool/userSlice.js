// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        getAll_users: (state, action) => {
            return action.payload;
        },
        delete_users: (state, action) => {
            // Use filter to create a new array without the deleted user
            return state.filter(item => item.id !== action.payload);
        },
        update_users: (state, action) => {
            const updatedIndex = state.findIndex(item => item.id === action.payload.id);
            if (updatedIndex !== -1) {
                state[updatedIndex] = action.payload;
            }
        },
        // Add the missing updateUser action
        updateUser: (state, action) => {
            const updatedIndex = state.findIndex(item => item.id === action.payload.id);
            if (updatedIndex !== -1) {
                state[updatedIndex] = action.payload;
            }
        },
    }
});

export const {
    getAll_users,
    delete_users,
    update_users,
    updateUser // Don't forget to export updateUser
} = userSlice.actions;

export default userSlice.reducer;
