const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../Services/authServices');

//register new user
router.post('/register', function(req,res){
    registerUser(req,res);
});

//login
router.post('/login', function(req,res){
    loginUser(req,res);
});

module.exports = router;