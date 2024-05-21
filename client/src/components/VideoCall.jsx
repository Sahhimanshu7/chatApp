import React, { useState } from 'react'
import { Peer } from "peerjs"
import { useAuth } from '../context/AuthContext';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const VideoCall = ({ socket }) => {
    // const [startVideoCall, setStartVideoCall] = useState(false);
    const [sendVideoCallState, setSendVideoCallState] = useState(false);

    const { currentUser, currentFriend } = useAuth();

    //sending a call from user to the friend.
    const sendVideoCall = () => {
      setSendVideoCallState(true);
      console.log("Hello")

      socket.current.emit("video-call", {
        senderId: currentUser._id,
        receiverId: currentFriend._id
      });

      const videoGrid = document.getElementById('video-grid') // Find the Video-Grid element
      
      const myVideo = document.createElement('video') // Create a new video tag to show our video
      myVideo.muted = true // Mute ourselves on our end so there is no feedback loop
      
      // Access the user's video and audio
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }). then(stream => {
        addVideoStream(myVideo, stream, videoGrid) // Display our video to ourselves
      })
    }

    // const myPeer = new Peer() // Creating a peer element which represents the current user
    

    // 
    // navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: true
    // }).then(stream => {
    //     addVideoStream(myVideo, stream) // Display our video to ourselves

    //     myPeer.on('call', call => { // When we join someone's room we will receive a call from them
    //         call.answer(stream) // Stream them our video/audio
    //         const video = document.createElement('video') // Create a video tag for them
    //         call.on('stream', userVideoStream => { // When we recieve their stream
    //             addVideoStream(video, userVideoStream) // Display their video to ourselves
    //         })
    //     })

    //     // socket.on('user-connected', userId => { // If a new user connect
    //     //     connectToNewUser(userId, stream) 
    //     // })
    // })

    // myPeer.on('open', id => { // When we first open the app, have us join a room
    //     socket.emit('join-room', ROOM_ID, id)
    // })


    function addVideoStream(video, stream, videoGrid) {
        video.srcObject = stream 
        video.addEventListener('loadedmetadata', () => { // Play the video as it loads
            video.play()
        })
        videoGrid.append(video) // Append video element to videoGrid
    }

    // function connectToNewUser(userId, stream) { // This runs when someone joins our room
    //     const call = myPeer.call(userId, stream) // Call the user who just joined
    //     // Add their video
    //     const video = document.createElement('video') 
    //     call.on('stream', userVideoStream => {
    //         addVideoStream(video, userVideoStream)
    //     })
    //     // If they leave, remove their video
    //     call.on('close', () => {
    //         video.remove()
    //     })
    // }
    
  return (
    <div>
        <button className='mr-4' onClick={(e) => sendVideoCall()}>
            <VideoCallIcon sx={{ color: "blue", fontSize: 40}}/>
        </button>
        {sendVideoCallState && 
        <div className='absolute top-0 left-0 w-[100vw] h-[100vh] flex z-30 flex-col'>
          <div id='video-grid'></div>
          <div>
            <button>Stop</button>
          </div>
        </div> 
    }
    </div>
  )
}

export default VideoCall