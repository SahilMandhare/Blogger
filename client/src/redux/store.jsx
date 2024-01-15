import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userData.jsx";

const reducerCombiner = combineReducers({userData: userReducer})

const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, reducerCombiner)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)