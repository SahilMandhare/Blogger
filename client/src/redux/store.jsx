import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userData.jsx";

export default configureStore({
    reducer: {
        userData: userReducer
    }
})