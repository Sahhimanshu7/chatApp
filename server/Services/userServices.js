const User = require('../Models/User');

// finding a user
const getUser = async(req,res) =>{
    const keyword = req.query.search ? {
        $or:[
            {firstName: {$regex:req.query.search, $options: "i"}},
            {lastName: {$regex:req.query.search, $options: "i"}},
            {email: {$regex:req.query.search, $options: "i"}},
            {username: {$regex:req.query.search, $options: "i"}},
        ],
    }: {};
    const users = await User.find(keyword);
    res.send(users);
}

// Returning user data
const getUserData = async(req,res) =>{
    console.log(req.params);
    const user = await User.findById(req.params.userId);
    console.log(user);
    res.status(200).json(user);
}

module.exports = { getUser, getUserData };
