// 

//        copyright @ Himanshu Sah 2023

//            server starts here

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');

// These modules are imported to apply socket.io
const { createServer } = require("node:http");
const { Server } = require("socket.io");
// const eiows = require("eiows");

const authRoute = require('./Routes/auth');
const userInfo = require('./Routes/userInfo');
const chatRoutes = require('./Routes/chatRoutes');
const messageRoutes = require('./Routes/messageRoutes.js');
const userFriends = require('./Routes/userFriends.js');

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = createServer(app);

// const io = new Server(httpServer, 
//                       {
//                         pingTimeout: 60000,
//                         cors: {origin: 'http://localhost:3000'}
//                       },
//                       {
//                         wsEngine: eiows.Server
//                       });

dotenv.config();

//Mongoose connection establishment and check
mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>{
    console.log("Connected to database");
}).catch(e=>{
    console.log("Error ",e);
})

//middleware
app.use(express.json());

// Authentication route
app.use('/api/auth/', authRoute);

// updating user info             -- Incomplete
app.use('/api/userinfo/',userInfo);

// Messages and chats
app.use('/api/chatapp/', chatRoutes);
app.use('/api/messages/', messageRoutes);

// Updating friends 
app.use('/api/user-friends/', userFriends);

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// io.on("connection", (socket) => {
//   socket.on('setup', (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   })

//   socket.on("join chat", (room)=>{
//     socket.join(room);
//   })
// });