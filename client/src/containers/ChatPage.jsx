import Search from '../components/Search';
import './ChatPage.css';
import RightSide from '../components/RightSide';    // Contains the chat box
import SearchLeft from '../components/Search2';     // To search for the friends who are in the friendlist and can communicate with
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { logInUser } from "../reduxFeatures/user.jsx";
import { useNavigate } from 'react-router-dom';

function ChatPage(){
    const chatID = 1234; // TO be loaded from database later 
    
    const navigate = useNavigate();

    const { user, loggedIn, isLoading } = useSelector((store) => store.user);
    
    return (
        <div className="chat-page">
            <div className="header">
                <div className = "logo">Chat App</div>
                <Search />
                <div className = "profile-img">
                    <button onClick={(e) =>{
                        navigate(`/profilePage/${user._id}/${"true"}`);
                    }}>
                    </button>
                </div>
            </div>
            <div className = "body">
                {/* Divide the body into two parts for desktop => leftside and right side; for mobile use left as top and right as buttom; */}
                <div className = "left-side">
                    <SearchLeft />
                </div>
                <div className = "right-side">
                   <RightSide id={chatID} selected={true}/>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;
