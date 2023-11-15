import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reduxFeatures/user.jsx';
import chatReducer from '../reduxFeatures/chat.jsx';

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer
    },
});
