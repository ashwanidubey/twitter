const express=require('express');
const {checkSignupFormate}=require('../middleware/checkSignupFormate')
const {doesEmailExist}=require('../middleware/doesEmailExist')
const {login,logout,signup,forgatepwd}=require('../function/authentication')
const authentication=express.Router();

authentication.post('/login',login)
authentication.get('/logout',logout)
authentication.post('/signup',checkSignupFormate,doesEmailExist,signup)
authentication.post('/forgatepwd',forgatepwd)
module.exports={authentication}