const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require('./Routes/auth');
const userInfo = require('./Routes/userInfo')

const PORT = process.env.PORT || 8080;
const app = express();

const fs = require('fs');
const userFriends = require('./Routes/userFriends')
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

app.use('/api/auth', authRoute);
app.use('/api/',userInfo);
app.use('/api/',userFriends);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});