import Search from '../components/Search';
import './ChatPage.css';
import RightSide from '../components/RightSide';    // Contains the chat box
import SearchLeft from '../components/Search2';     // To search for the friends who are in the friendlist and can communicate with
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { logInUser } from "../reduxFeatures/user.jsx";

function ChatPage(){
    const chatID = 1234; // TO be loaded from database later
    const userId = useParams();     // ID of the user logged in 
   
    // Make get request to the server for user data
    useEffect(() =>{ 
    axios.get(`/api/userInfo/get-user-data/${userId.url}`)
    .then((response) => {
        if(response.status === 304){
                console.log("Resources not modified, using cached data.")
        }else {
            console.log(response.data);
        }
    })
    .catch((error) =>{
            console.log(error);
    })
    },[userId.url]); 
    
    const { user, loggedIn, isLoading } = useSelector((store) => store.user);
    console.log(user);
    return (
        <div className="chat-page">
            <div className="header">
                <div className = "logo">Chat App</div>
                <Search />
                <div className = "profile-img">
                    <button onClick={(e) =>{
                                             
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
                   <RightSide id={chatID}/>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;
