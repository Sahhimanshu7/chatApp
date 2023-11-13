import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./ProfilePage.css";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { logInUser } from "../reduxFeatures/user.jsx";

export default function ProfilePage() {
    const { userId, isCurrentUser } = useParams();  // Getting data from redirect 
    
    const { user, loggedIn, isLoading } = useSelector((store) => store.user);

    const [userLoad, setUserLoad] = useState(); 
    // Making a get request to get user data 
    const loadUser = async() =>{
        await axios.get(`/api/userinfo/get-user-data/${userId}` ) 
        .then((res) => {
            setUserLoad(res.data);
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() =>{
        loadUser();
        },[])

    const addFriend = async(e) =>{
        console.log(user);
        await axios.put("/api/user-friends/send-request/", {
            senderID : user._id,
            receiverID : userId
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    return (
        <div className = "profilepage-main">
            <div className = "profilepage-background">
                
            </div>
            <div className = "profilepage-image">
                {userLoad? <img src = {userLoad.profilePicture} alt = '' /> : ''}
            </div>
            <div className = "profilepage-name">
                {userLoad? <p className = "profilepage-actual-name">{userLoad.firstName} {userLoad.lastName}</p> : ''}
                {userLoad? <p className = 'profilepage-username'></p> : ''}
            </div>
            <div className = "profilepage-edit-selection">
                {userLoad? 
                    <div className = "profilepage-selection">
                        {isCurrentUser === "true"?
                            <div className = "profilepage-edit">
                                <button>Edit your Profile</button>
                            </div>
                            :
                            <div className = "profilepage-addFriend">
                                <button onClick = {(e => addFriend(e))}>Add Friend</button>
                            </div>
                        }
                    </div>
                    :
                    ''
                }
            </div> 
        </div> 
  )
}   


