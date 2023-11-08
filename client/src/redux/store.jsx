import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reduxFeatures/user.jsx';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
