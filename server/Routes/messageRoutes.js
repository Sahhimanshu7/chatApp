const express = require('express');
const router = express.Router();
const messengerServices = require('../Services/messengerServices');

//get latest messages for a chat.

router.post(`/getMessages/`, function(req,res){
    messengerServices.getMessages(req,res);
})

//fetch latest messages for a chat.
router.post(`/fetchMessage/`, function(req,res){
    messengerServices.fetchMessage(req,res);
})

module.exports = router;