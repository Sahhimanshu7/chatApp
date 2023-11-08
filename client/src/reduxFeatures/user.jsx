import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    user: {},
    loggedIn: false,
    isLoading: true,
};

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        logInUser: (slate, action) =>{
            return { user: action.payload.userApp,
            loggedIn:action.payload.isloggedIn,
            isLoading:false}
        }
    }
});

export const{logInUser} = userSlice.actions;

export default userSlice.reducer;
