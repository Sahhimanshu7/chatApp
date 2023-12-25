import React, { useState, useEffect } from 'react';
import './RightSide.css';
import back from '../dummy images/arrow.svg';
import audio from '../dummy images/audio.png';
import video from '../dummy images/video.png';

import photo from '../dummy images/back.JPG';

import { useSelector } from "react-redux";

// import { socket } from "../Socket";

export default function RightSide({id}) {

    // const [socketConnection, setSocketConnection] = useState(false);
    
    let prevId = " ";
    const messages = [
        {"sender": "1234", "content": "Hi"},
        {"sender": "5678", "content": "Hello"},
        {"sender": "5678", "content": "Do I know you?"},
        {"sender": "1234", "content": "Yes you do."},
        {"sender": "1234", "content": "We are great friends for a long time and we have done a lot of business together"}
    ]

    //Send new message
    

    const { friend, chatId, isSelected } = useSelector((store) => store.chat);

    console.log(friend,isSelected,chatId);

    const { user } = useSelector((store) => store.user);

    // useEffect(()=>{
    //     if(isSelected){ 
    //         socket.emit('setup', user);
    //         socket.on("connection", () => setSocketConnection(true));

    //         socket.emit("join chat", chatId._id);
    //     }
    // },[isSelected,chatId])


  return (
    <div className='right-side-comp'>
        <>
        {isSelected ? 
        
    
   <>
        <div className='right-comp-header'>
            <div className='right-header-left'>
                <img src={back} alt='' />
                <img src={photo} alt='' />
                <div className='chat-name-display'>
                    <button>
                    <h4>{user.username}</h4>
                    <p>{user.name}</p>
                    </button>
                </div> 
            </div>
            <div className='right-header-right'>
                <button>
                    <img src={audio} alt='' />
                </button>
                <button>
                    <img src={video} alt='' />
                </button>
            </div>
        </div>
        <div className='right-body'>
            {messages.map((message) => {
            // These if statements are used for logic to determine
            // the text is from sender or the receiver 
            if(message.sender === id.toString() && (prevId === " " || prevId === "5678")){
                prevId = id.toString();
                return(
                    <div className='sender'>
                        <img src={photo} alt='' />
                        <p>{message.content}</p>
                    </div>
                )
            }else if(message.sender === id.toString() && prevId === id.toString()){
                prevId = id.toString();
                return(
                    <div className='sender' style={{paddingLeft : "50px", marginTop: "0px"}}>
                        <p>{message.content}</p>
                    </div>
                )
            }else if(message.sender === "5678" && (prevId === " " || prevId === id.toString())){
                prevId = "5678";
                return(
                    <div className='receiver'>
                        <p>{message.content}</p>
                        <img src={photo} alt='' />
                    </div>
                )
            }else if(message.sender === "5678" && prevId === "5678"){
                prevId = "5678";
                return(
                    <div className='receiver' style={{paddingRight : "50px", marginTop: "0px"}}>
                        <p>{message.content}</p>
                    </div>
                )
            }else{
                return <p>No messages</p>
            }
        })}
        </div>
        <div className='right-footer'>
            <form>
                <input name='message' placeholder='Message ... ' />
                <button type='submit'>send</button>
            </form>
        </div>
        </>
        : <div className='select-user-message'>
            <p>No chat Selected.</p>
            <p>Select a chat or search for a friend to get started.</p>
        </div>
         }
         </>
    </div>
  )
}
