const express = require('express');
const router = express.Router();


//send friend request
router.post('/sendFriendRequest', async(req,res)=>{
    try{
        const myQuery = { username: "himanshusah41"} // Logged in profile
        const userFriendRequestSent = {
            friendRequestSend:req.body.friendRequestSend
        }
        const friendRequestSend = await UserFriends.updateOne(myQuery,userFriendRequestSent);
        const userFriendRequestReceived = {
            friendRequestReceived:myQuery
        }
        const friendRequestReceived = await UserFriends.updateOne(req.body.friendRequestSend,userFriendRequestReceived);
        res.status(200).json(friendRequestReceived,friendRequestSend);
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;