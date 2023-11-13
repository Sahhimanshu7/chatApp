const User = require('../Models/User');

// send friend request
const sendFriendsRequest = async(req,res) =>{
    const senderID = req.body.senderID;
    const receiverID = req.body.receiverID;
    try {
        await User.findByIdAndUpdate(senderID, {$push:{friendRequestSend:receiverID}});
        await User.findByIdAndUpdate(receiverID,{$push:{friendRequestReceived:senderID}});
        res.status(200).json("Friend request sent");
    } catch (error) {
        res.status(500).status(error);
    }
}

// delete friend request
const deleteFriendRequest = async(req,res) =>{
    const senderID = req.params.senderID;
    const receiverID = req.params.receiverID;
    try {
        await User.findByIdAndUpdate(senderID,{$pull:{friendRequestSend:receiverID}});
        await User.findByIdAndUpdate(receiverID,{$pull:{friendRequestReceived:senderID}});
    } catch (error) {
        res.status(500).json(error);
    }
}

// show friend requests



module.exports = {sendFriendsRequest,
                deleteFriendRequest}
