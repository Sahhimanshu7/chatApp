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



module.exports = { getUser}
