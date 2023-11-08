const User = require("../Models/User");
const bcrypt = require("bcryptjs");

// registering new user
const registerUser = async(req,res) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            location:req.body.location,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            profilePicture:req.body.profilePicture,
            about:req.body.about,
            backgroundPicture:req.body.backgroundPicture,
            organization:req.body.organization,
            position:req.body.position,
            hobbies:req.body.hobbies,
            friends:req.body.friends,
            friendRequestReceived:req.body.friendRequestReceived,
            friendRequestSend:req.body.friendRequestSend
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

// login
const loginUser = async(req,res) =>{
    try{
        const user = await User.findOne({username:req.body.username});
        if(user){
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(validPassword){
                res.status(200).json(user);
            }else{
                res.status(400).json("Wrong Password");
            }
        }else{
            res.status(400).json("Username not Found!");
        }
    }catch(error){
        res.status(500).json(error);
    }
}

module.exports = { registerUser,
                    loginUser}
