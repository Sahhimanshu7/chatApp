const express = require('express');
const router = express.Router();
const chatServices = require('../Services/chatServices');

// get chats for two users

router.post(`/getchat/`,function(req,res){
    chatServices.getChat(req,res);
});

module.exports = router;