import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    friend:{},
    chatId: null,
    isSelected: false
};

const chatSlice = createSlice({
    name: 'Chat',
    initialState,
    reducers: {
        selectChat: (slate, action) =>{
            return { friend: action.payload.friendApp,
            chatId:action.payload.chatId,
            isSelected:true}
        }
    }
});

export const{selectChat} = chatSlice.actions;

export default chatSlice.reducer;
