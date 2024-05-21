import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import ChatRoom from "./ChatRoom";
import GetVideoCall from "./GetVideoCall";

const initiateSocketConnection = async () => {
  const socket = io("http://localhost:8080",{
    reconnectionDelayMax: 10000
  });

  return socket;
}

const ChatBox = () => {
  const { currentUser, currentChat } = useAuth();

  const socket = useRef();
  const [onlineUsersId, setonlineUsersId] = useState([]);

  const [videoCallData, setVideoCallData] = useState();

   useEffect(() => {
    const getSocket = async () => {
      const res = await initiateSocketConnection();
      socket.current = res;
      socket.current.emit("addUser", currentUser._id);
      socket.current.on("getUsers", (users) => {
        const userId = users.map((u) => u[0]);
        setonlineUsersId(userId);
      });
    };

    getSocket();
  }, [currentUser._id]);

  useEffect(() => {
    const getVideoCall = () => {
      socket.current?.on("getVideoCall", (data) => {
        setVideoCallData(data);
      })
    }

    getVideoCall();
  })

  return (
    <div className="md:w-[70vw] m-4 border-blue-950 border-2 border-line rounded-3xl">
      {currentChat ? (
        <div>
          <ChatRoom 
            socket={socket}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-white text-xl text-center">
            Please select a chat or search a user to text.
          </p>
        </div>
      )}
      {videoCallData && 
      <div>
        <GetVideoCall data={videoCallData} />
      </div>
      }
    </div>
  );
};

export default ChatBox;
