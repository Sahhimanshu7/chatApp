import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import "../../assests/profile.css";

export default function Profile() {
    const navigate = useNavigate();

    const { currentUser, updateUserProfile, setError } = useAuth();

    const [username, setUsername] = useState(currentUser.displayName);
    const [profileURL, setProfileURL] = useState(currentUser.photoURL);
    const [loading, setLoading] = useState(false);
    const [photo,setPhoto] = useState(profileURL);

    const handleChangeSubmit = async(e) =>{
        e.preventDefault();
    }

    return (
        <div className="profile">
            <form onSubmit={handleChangeSubmit}>
                <div className="profile-photo-field">
                    {(profileURL == null && !photo) ?
                        <img className = "profile-photo" src={require("../../assests/profileIcon.jpg")} alt="" /> 
                        :
                        <img className = "profile-photo" src={photo} alt="" />   
                }
                    <label for= "file" className="btn">
                        Edit
                    </label>
                    <input 
                    id="file"
                    type="file"
                    name="file"
                    className="image"
                    placeholder="edit"
                    onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
                    /> 
                </div>
                <label for="userName" className="userLabel">
                    Username
                </label>
                <input
                id="userName"
                type="text"
                name="userName"
                className="userName"
                placeholder={username} 
                onChange={(e) => setUsername(e.target.value)}
                />
                <button
                type="submit"
                disabled={loading}
                className="photoSubmit"
                >
                    Save Changes
                </button>
            </form>
        </div>
    )
}