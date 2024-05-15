import { useState, useEffect, useRef } from "react";

import {
  getMessagesOfChatRoom,
  sendMessage,
} from "../../services/ChatServices";

import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";
import "../../assests/chatRoom.css";

export default function ChatRoom({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesOfChatRoom(currentChat._id);
      setMessages(res);
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

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleFormSubmit = async (message) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser.uid,
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser.uid,
      receiverId: receiverId,
      message: message,
    });

    const messageBody = {
      chatRoomId: currentChat._id,
      sender: currentUser.uid,
      message: message,
    };
    const res = await sendMessage(messageBody);
    setMessages([...messages, res]);
  };

  return (
    <div className="chat-box">
      <div className="chat-head">
        <Contact
          chatRoom={currentChat}
          currentUser={currentUser}
          className="contact"
        />
      </div>

      <div className="message-box">
        <ul className="space-y-2">
          {messages.map((message, index) => (
            <div key={index} ref={scrollRef}>
              <Message message={message} self={currentUser.uid} />
            </div>
          ))}
        </ul>
      </div>

      <ChatForm handleFormSubmit={handleFormSubmit} className="chat-form" />
    </div>
  );
}
