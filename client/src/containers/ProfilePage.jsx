import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./ProfilePage.css";
import { useState, useEffect } from 'react'
export default function ProfilePage() {
    const { userId, isCurrentUser } = useParams();  // Getting data from redirect 
    
    const [user, setUser] = useState(); 
    // Making a get request to get user data 
    const loadUser = async() =>{
        await axios.get(`/api/userinfo/get-user-data/${userId}` ) 
        .then((res) => {
            setUser(res.data);
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() =>{
        loadUser();
        },[])

    console.log(user);

    return (
        <div className = "profilepage-main">
            <div className = "profilepage-background">
                
            </div>
            <div className = "profilepage-image">
                {user? <img src = {user.profilePicture} alt = '' /> : ''}
            </div>
            <div className = "profilepage-name">
                {user? <p className = "profilepage-actual-name">{user.firstName} {user.lastName}</p> : ''}
                {user? <p className = 'profilepage-username'></p> : ''}
            </div>
            <div className = "profilepage-edit-selection">
                {user? 
                    <div className = "profilepage-selection">
                        {isCurrentUser === "true"?
                            <div className = "profilepage-edit">
                                <button>Edit your Profile</button>
                            </div>
                            :
                            <div className = "profilepage-addFriend">
                                <button>Add Friend</button>
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


