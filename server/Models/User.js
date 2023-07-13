const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:6
    },
    firstName:{
        type:String,
        min:2,
        max:40
    },
    lastName:{
        type:String,
        min:2,
        max:40
    },
    profilePicture:{
        type:String,
        default:" "
    },
    backgroundPicture:{
        type:String,
        default:" "
    },
    about:{
        type:String,
        max:160,
        default:" "
    },
    location:{
        type:String,
        required:true,
        max:20
    },
    organization:{
        type:String,
        default:" "
    },
    position:{
        type:String,
        max:40,
        default:" "
    },
    hobbies:{
        type:Array,
        default:[],
        max:9
    }
},
{timestamps:true});

module.exports = mongoose.model("User",UserSchema);