const mongoose = require('mongoose');

const uploadImageSchema = new mongoose.Schema({
    name:String,
    desc:String,
    img:
    {
        data:Buffer,
        contentType:String
    }
},
{timestamps:true});

module.exports = mongoose.Schema("UploadImage",uploadImageSchema);