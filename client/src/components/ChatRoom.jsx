import React from 'react'
import { useState, useEffect, useRef } from "react";
import { useAuth } from '../context/AuthContext';
import axios from "axios";

import Message from './Message';

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
      {/* messages box */}
      <div className="message-box">
        <ul className="space-y-2">
          {messages.map((message, index) => (
            <div key={index} ref={scrollRef}>
              <Message message={message} self={currentUser._id} />
            </div>
          ))}
        </ul>
      </div>
      {/* chat form */}
      <div ref={scrollRef}>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          placeholder="Message ... "
          className="message-input"
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" className="submit-message">
          Submit
        </button>
        </form>
      </div>
    </div>
  )
}

export default ChatRoom