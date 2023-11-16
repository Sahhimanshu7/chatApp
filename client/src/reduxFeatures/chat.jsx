import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    friend:{},
    chatId: {},
    isSelected: false
};

const chatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        selectChat: (slate, action) =>{
            return { friend: action.payload.friendApp,
            chatId:action.payload.chatIdApp,
            isSelected:action.payload.isSelectedApp}
        }
    }
});

export const{selectChat} = chatSlice.actions;

export default chatSlice.reducer;
