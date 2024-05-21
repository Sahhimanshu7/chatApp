import { useState } from "react";

import { AccountCircle } from "@mui/icons-material";

import { storage } from "../utils/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
//context
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  
  const [newImage, setNewImage] = useState();
  const [displayImage, setDisplayImage] = useState("");

  const imageUpload = () => {
    if(newImage == null) return;
    const imageRef = ref(storage, `profileImages/${newImage.name + v4()}`)
    uploadBytes(imageRef, newImage).then((res) => {
      alert("Image Uploaded");
      console.log(res);
    })
    setNewImage(null);
  }
  return (
    <div className="bg-black h-[92vh] flex items-center flex-col justify-center">
      <h1 className="text-white text-3xl">Profile</h1>
      <div className="flex justify-center flex-col items-center space-y-8">
        <div className="relative top-20 left-10">
          <input type="file" className="absolute left-0 cursor-pointer w-[60px] opacity-0" onChange={(e) => {
            setNewImage(e.target.files[0]);
            setDisplayImage(URL.createObjectURL(e.target.files[0]))
            }}/>
          <button className="text-white bg-blue-950 rounded-3xl px-2 py-1 text-sm">Edit</button>
        </div>
        <div>
          {currentUser.ProfileImage ? (
            <img src={users.ProfileImage} alt="Not found" className="h-[180px]"/>
          ) :
          displayImage ? (
            <img src={displayImage} alt="Profile Image" className="h-[180px] rounded-[50%] w-[180px]"/>
          ):(<AccountCircle sx={{ color: "white", fontSize: 180 }} />)
        }
        </div>
        <div>
          {newImage && <button className="bg-blue-950 text-white px-4 py-2 rounded-3xl" onClick={() => imageUpload()}>Upload</button>}
        </div>
        <div className="space-y-8">
          <div className="text-white flex space-x-2"><p>Username: </p><p>{currentUser.username}</p></div>
          <div className="text-white flex space-x-2"><p>Email: </p><p>{currentUser.email}</p></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
