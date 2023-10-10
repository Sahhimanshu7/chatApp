const express = require('express');
const router = express.Router();
const authServices = require('../Services/authServices');

//register new user
router.post('/register', function(req,res){
    authServices.registerUser(req,res);
});

//login
router.post('/login', function(req,res){
    authServices.loginUser(req,res);
});

module.exports = router;