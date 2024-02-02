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

    const [requestsReceived, setRequestsReceived] = useState([]);
    // Making a get request to get user data 
    const loadUser = async() =>{
        await axios.get(`/api/userinfo/get-user-data/${userId}` ) 
        .then((res) => {
            setUserLoad(res.data);
        })
        .catch(err => console.log(err))
    }

    const logout = () =>{
        console.log("Logout");
    }

    // Only if its loggedIn user's profile
    const loadFriendRequestReceived = async(e) =>{
        await axios.get(`/api/userinfo/get-user-data/${e}`)
        .then((res)=>{
            setRequestsReceived((requestsReceived)=>[...requestsReceived,res.data]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    useEffect(() =>{
        loadUser(); 
    },[])

    useEffect(()=>{
    if (userLoad) {
        console.log(userLoad.friendRequestReceived);
        for (let index = 0; index < userLoad.friendRequestReceived.length; index++) {
            loadFriendRequestReceived(userLoad.friendRequestReceived[index]); 
            console.log(userLoad.friendRequestReceived[index]);
        }
    }
    },[userLoad])

    //Sending friend requests
    const addFriend = async(e) =>{
        await axios.put("/api/user-friends/send-request/", {
            senderID : user._id,
            receiverID : userId
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    // Accepting friend Request
    const acceptFriendReq = async(reqId) =>{
        console.log(reqId);
        console.log(user);
        await axios.put("/api/user-friends/accept-req/",{
            userID: user._id,
            reqID: reqId
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    return (
        <div className = "profilepage-main">
            
            <div className = "profilepage-image">
                {userLoad? <img src = {userLoad.profilePicture} alt = '' /> : ''}
            </div>
            <div className = "profilepage-name">
                {userLoad? <p className = "profilepage-actual-name">{userLoad.firstName} {userLoad.lastName}</p> : ''}
                {userLoad? <p className = 'profilepage-username'>@{userLoad.username}</p> : ''}
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
                {isCurrentUser === "true" ? 
                <div className = "profilepage-logout">
                    <button className='Logout' onClick={(e => logout())}>Log out</button>
                </div>
                :
                " "
}
            </div> 
            {userLoad? 
            <>
            {isCurrentUser === "true" ? 
            <div className='friend-requests-received'>
                <p className='head'>Friend Requests</p>
                {requestsReceived.map((elem)=>{
                    return (
                                <div className='friend-requests-listitems'>
                                    <button className='friend-request-profile-direct'>
                                    <img src={elem.profilePicture} className='profile-picture-request' alt = " "/>
                                    <div className='names'>
                                        <p className='req-names'>{elem.firstName} {elem.lastName}</p>
                                        <p className='req-username'>{elem.username}</p>
                                    </div>
                                    </button>
                                    <div className='button-accept'>
                                        <button
                                        onClick={() => acceptFriendReq(elem._id)}
                                        >Accept</button>
                                    </div>
                                    <div className='button-decline'>
                                        <button className='decline'>Decline</button>
                                    </div>
                                </div>
                            )
                })}
            </div>
            
            :
            ''
}
</>
            :
            ''
}

            
        </div> 
  )
}   


