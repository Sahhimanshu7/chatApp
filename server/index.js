import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import "./config/mongo.js";

import { VerifyToken, VerifySocketToken } from "./middlewares/VerifyToken.js";

import userRoutes from "./routes/user.js";
import chatMessageRoutes from "./routes/chatMessage.js";
import chatRoomRoutes from "./routes/chatRoom.js";

const app = express();

dotenv.config();

// app.use(cors({origin: "www.chatusa.online"}));
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(VerifyToken);

const PORT = process.env.PORT || 8080;

// Implementing routes
app.use("/api/user", userRoutes);                       // User Route (Auth and get list)

app.use("/api/room", chatRoomRoutes);                   // Room routes

app.use("/api/message", chatMessageRoutes);             // Chat messages

const server = app.listen(PORT, () =>{
    console.log(`Server is lintening on ${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: "http://www.chatusa.online",
        credentials: true,
    },
});

io.use(VerifySocketToken);

global.onlineUsers = new Map();

const getKey = (map, val) =>{
    for (let [key, value] of map.entries()){
        if(value === val) return key;
    }
};

io.on("connection", (socket) =>{
    global.chatSocket = socket;

    socket.on("addUser", (userId) =>{
        onlineUsers.set(userId, socket.id);
        socket.emit("getUsers", Array.from(onlineUsers));
    });

    socket.on("sendMessage", ({ senderId, receiverId, message })=>{
        const sendUserSocket = onlineUsers.get(receiverId);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("getMessage", {
                senderId,
                message,
            });
        }
    });

    socket.on("disconnect", () =>{
        onlineUsers.delete(getKey(onlineUsers, socket.id));
        socket.emit("getUsers", Array.from(onlineUsers));
    });
});