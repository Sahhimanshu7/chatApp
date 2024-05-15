import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

const ChatBox = () => {
  const { currentUser, currentChat } = useAuth();

  return (
    <div className="md:w-[70vw] m-4 border-blue-950 border-2 border-line rounded-3xl">
      {currentChat ? (
        <div>Chat</div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-white text-xl text-center">
            Please select a chat or search a user to text.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
