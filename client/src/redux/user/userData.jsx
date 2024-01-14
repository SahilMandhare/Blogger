import { createSlice } from "@reduxjs/toolkit";

export const userData = createSlice({
    name: "userData",
    initialState: {
        currentUser: null,
        error: null,
    },
    reducers: {
        successData: (state, actions) => {
            state.currentUser = actions.payload
            state.error = null
        },
        errorData: (state, actions) => {
            state.error = actions.payload
        }
    }
})

export const { successData, errorData } = userData.actions

export default userData.reducer