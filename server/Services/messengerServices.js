const MessageModel = require('../Models/MessageModel');
const User = require('../Models/User');

// Get sender's id, chatID, and content
// Add a new message to the database that links to a certain chatId with two users

// store messages of two users
const getMessages = async(req,res) =>{
    const sender = req.body.sender;
    const chat = req.body.chatId;
    const content = req.body.content;

    try {
        const newMessage = new MessageModel({
            sender: sender,
            chat: chat,
            content: content
        }); 
        const message = await newMessage.save();
        res.status(200).json(message);
    } catch (error) {
        console.log("Error stroing the new chat. : ", error);
    }
}

//fetch old messages of a given chatId
const fetchMessage = async(req,res) =>{
    const sender = req.body.sender;
    const chat = req.body.chat;

    try {
        await MessageModel.find({sender: sender, chat: chat})
        .then((result) => {
            console.log(result);    
        }).catch((err) => {
            console.log("Fetch message error");
        });
    } catch (error) {
        console.log("Error loading chats, : ", error);
    }
}

module.exports = {getMessages, fetchMessage};