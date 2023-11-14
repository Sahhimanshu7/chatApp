const express = require('express');
const router = express.Router();
const userFriendServices = require('../Services/userFriendServices');

//send friend request
router.put('/send-request/', function(req,res){
    userFriendServices.sendFriendsRequest(req,res);
});

// delete friend request
router.put('/deleteFriendRequest', function(req,res){
    userFriendServices.deleteFriendRequest(req,res);
})

//get friends list
router.put('/getFriends', function(req,res){
    userFriendServices.getFriends(req,res);
})

// accpet friend
router.put('/accept-req/',function(req,res){
    userFriendServices.acceptFriendReq(req,res);
})

module.exports = router;
