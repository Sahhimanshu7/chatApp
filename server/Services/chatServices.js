const ChatModel = require('../Models/ChatModel');
const User = require('../Models/User');

// get chat of two users
const getChat = async(req,res) =>{
    const userID = req.body.id;
    const friendID = req.body.friendid;
    var isChat = await ChatModel.find({
        isGroupChat:false,
        $and: [
            {users: {$elemMatch: {$eq: userID}}},
            {users: {$elemMatch: {$eq: friendID}}}
        ],
    }).populate("users", "-password")
    .populate("latestMessage");
    
    isChat = await User.populate(isChat, {
        path:"latestMessage.sender",
        select:"username email firstName lastName"
    });
    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [userID, friendID]
        };
        try {
            const createdChat = await ChatModel.create(chatData);
            const fullChat = await ChatModel.findOne({_id:createdChat._id}).populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

// fetching chat for users
const fetchChat = async(req,res) =>{
    const userID = req.body.id;
    try {
        await ChatModel.find({users: {$elemMatch: {$eq:userID}}})
        .populate("users", "-password")
        .populate("GroupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt : -1})
        .then(async(results) =>{
            results = await User.populate(results,{
                path:"latestMessage.sender",
                select:"username email firstName lastName"
            });
            res.status(200).send(results);
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {getChat, fetchChat}