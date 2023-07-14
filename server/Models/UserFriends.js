const mongoose = require('mongoose');

const UserFriendsSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
        unique:true
    },
    friends:{
        type:Array,
        default:[]
    },
    friendRequestReceived:{
        type:Array,
        default:[]
    },
    friendRequestSend:{
        type:Array,
        default:[]
    }
},
{timestamps:true});

module.exports = mongoose.model("userFriends",UserFriendsSchema);