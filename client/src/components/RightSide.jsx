import React, { useState } from 'react';
import './RightSide.css';
import back from '../dummy images/arrow.svg';
import audio from '../dummy images/audio.png';
import video from '../dummy images/video.png';

import photo from '../dummy images/back.JPG';

import { useSelector } from "react-redux";

export default function RightSide({id}) {
    console.log(id.toString());
    // display the chat 
    // design the header body and footer 

    // Object will be passed down from the parent component
    const users = {
        "name": "Roji Lama",
        "userName": "ijor98"
    }

    let prevId = " ";
    const messages = [
        {"sender": "1234", "content": "Hi"},
        {"sender": "5678", "content": "Hello"},
        {"sender": "5678", "content": "Do I know you?"},
        {"sender": "1234", "content": "Yes you do."},
        {"sender": "1234", "content": "We are great friends for a long time and we have done a lot of business together"}
    ]

    const { friend, chatId, isSelected } = useSelector((store) => store.chat);

    const { user, loggedIn, isLoading } = useSelector((store) => store.user);

    


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
            <p>Hello</p>
        </div>
         }
         </>
    </div>
  )
}
