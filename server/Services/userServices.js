const User = require('../Models/User');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// finding a user
const getUser = async(req,res) =>{
    const keyword = req.query.search ? {
        $or:[
            {firstName: {$regex:req.query.search, $options: "i"}},
            {lastName: {$regex:req.query.search, $options: "i"}},
            {email: {$regex:req.query.search, $options: "i"}},
            {username: {$regex:req.query.search, $options: "i"}},
        ],
    }: {};
    const users = await User.find(keyword);
    res.send(users);
}

// find a user but friend
const getUserFriends = async(req,res) =>{
    const userID = req.params.userID;

    const friendList = await User.findById(userID);
    
    const keyword = req.query.search ? {
        $or:[
            {firstName: {$regex:req.query.search, $options: "i"}},
            {lastName: {$regex:req.query.search, $options: "i"}},
            {email: {$regex:req.query.search, $options: "i"}},
            {username: {$regex:req.query.search, $options: "i"}},
        ],
    }: {};
    const users = await User.find(keyword);
    let usersFriends = []
    for (let index = 0; index < users.length; index++) {
        for (let i = 0; i < friendList.friends.length; i++) {
            if(users[index]._id.toString() === friendList.friends[i]) {
                usersFriends.push(users[index]);
            };     
        }
    }
    res.send(usersFriends);
}

// Returning user data
const getUserData = async(req,res) =>{
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
}

module.exports = { getUser, getUserData, getUserFriends };
