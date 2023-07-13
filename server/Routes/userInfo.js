const express = require('express');
const router = express.Router();
const User = require("../Models/User");

//updating user about section
router.post('/update', async(req,res)=>{
    try{
        const myQuery = { username : "himanshusah41"}
        const userInfo = {$set :{
            about:req.body.about,
            location:req.body.location,
            position:req.body.position,
            username:req.body.username,
            hobbies:req.body.hobbies,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        }}
        const user = await User.updateOne(myQuery, userInfo);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;