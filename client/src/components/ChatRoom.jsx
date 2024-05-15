import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useAuth } from '../context/AuthContext';
import axios from "axios";

import Message from './Message';
import SendIcon from '@mui/icons-material/Send';

const ChatRoom = ({ socket }) => {
    const { currentUser, currentChat } = useAuth();

    console.log(currentChat);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {
      incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
    }, [incomingMessage]);

    // get messages of the chat 
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`http://localhost:8080/api/message/${currentChat._id}`);
        console.log(res.data);
        setMessages(res.data);
      };

      fetchData();
    }, [currentChat._id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        socket.current?.on("getMessage", (data) => {
        setIncomingMessage({
            senderId: data.senderId,
            message: data.message,
        });
        });
    }, [socket]);  

    // create message of a chat
    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage("");
        const receiverId = currentChat.members.find(
        (member) => member !== currentUser._id,
      );

      socket.current.emit("sendMessage", {
        senderId: currentUser._id,
        receiverId: receiverId,
        message: message,
      });

      const messageBody = {
        chatRoomId: currentChat._id,
        sender: currentUser._id,
        message: message,
      };

      const res = await axios.post("http://localhost:8080/api/message", messageBody);
      setMessages([...messages, res.data]);
    }

  return (
    <div>
      {/* header of message box */}
      <div className='md:h-[5vh] bg-gray-700 rounded-t-3xl'>

      </div>
      {/* messages box */}
      <div className="w-full md:h-[72vh] overflow-y-auto mt-1">
        <ul className="space-y-2">
          {messages.map((message, index) => (
            <div key={index} ref={scrollRef}>
              <Message message={message} self={currentUser._id} />
            </div>
          ))}
        </ul>
      </div>
      {/* chat form */}
      <div className='relative top-[20px]'>
        <form onSubmit={handleSubmit} className='space-x-3 w-full flex mx-2'>
          <input
          type="text"
          placeholder="Message ... "
          className="md:w-[60vw] md:h-[40px] rounded-3xl bg-black text-white outline-none md:py-2 md:px-4"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" className="submit-message">
          <SendIcon sx={{ color: "white", fontSize: 30}}/>
        </button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoom