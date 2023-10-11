// 

//        copyright @ Himanshu Sah 2023

//            server starts here


const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');

const authRoute = require('./Routes/auth');
const userInfo = require('./Routes/userInfo');
const chatRoutes = require('./Routes/chatRoutes');

const PORT = process.env.PORT || 8080;
const app = express();


const fs = require('fs');

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
app.use('/api/userinfo',userInfo);

app.use('/api/chatapp/', chatRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

