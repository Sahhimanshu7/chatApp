const User = require('../Models/User');

// send friend request
const sendFriendsRequest = async(req,res) =>{
    const senderID = req.params.user._id;
    const receiverID = req.params.userId;
    try {
        await User.findByIdAndUpdate(senderID, {$pull:{friendRequestSend:receiverID}});
        await User.findByIdAndUpdate(receiverID,{$pull:{friendRequestReceived:senderID}});
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
        await User.findByIdAndUpdate(senderID,{$push:{friendRequestSend:receiverID}});
        await User.findByIdAndUpdate(receiverID,{$push:{friendRequestReceived:senderID}});
    } catch (error) {
        res.status(500).json(error);
    }
}

// // get friends list
// const getFriends = async(req,res) =>{
//     const userId = req.params.userId;
//     try {
//        const User = await User.findById({_id: userId});
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }
module.exports = {sendFriendsRequest,
                deleteFriendRequest}
