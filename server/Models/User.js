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
        default: null
    },
    backgroundPicture:{
        type:String,
        default: null
    },
    about:{
        type:String,
        max:160,
        default: null
    },
    location:{
        type:String,
        required:true,
        max:20
    },
    organization:{
        type:String,
        default:null
    },
    position:{
        type:String,
        max:40,
        default:null
    },
    hobbies:{
        type:Array,
        default:[],
        max:9
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

module.exports = mongoose.model("User",UserSchema);