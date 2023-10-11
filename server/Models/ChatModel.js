const mongoose = require('mongoose');

const ChatModelSchema = new mongoose.Schema({
    chatName:{
        type:String,
        trim: true,
        default:null
    },
    isGroupChat:{
        type: Boolean,
        default:false
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    latestMessage : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
    GroupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timeStamps:true});

module.exports = mongoose.model("ChatModel", ChatModelSchema);