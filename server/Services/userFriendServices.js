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

// accept friend request
const acceptFriendReq = async(req,res) =>{
    console.log("HEllo");
    const userID = req.body.userID;
    const reqID = req.body.reqID;
    console.log(userID,reqID);
    try {
        await User.findByIdAndUpdate(userID,{$pull:{friendRequestReceived:reqID}});
        await User.findByIdAndUpdate(reqID,{$pull:{friendRequestSend:userID}});

        await User.findByIdAndUpdate(userID,{$push:{friends:reqID}});
        await User.findByIdAndUpdate(reqID,{$push:{friends:userID}});
        res.status(200).json("Request Accepted!");
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {sendFriendsRequest,
                deleteFriendRequest,
            acceptFriendReq}
