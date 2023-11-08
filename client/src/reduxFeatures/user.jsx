import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    user:{},
    loggedIn: false,
    isLoading: true,
};

const userSlice = createSlice({
    name: 'User',
    initialState
});

console.log(userSlice);
