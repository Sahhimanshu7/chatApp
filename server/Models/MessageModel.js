const mongoose = require('mongoose');

const MessageModelSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type: String,
        trim: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"ChatModel"
    }

},{timeStamps:true})

module.exports = mongoose.Schema("MessageModel", MessageModelSchema);