const express=require('express');

const {like,comment,unlike,deletepost,
    createpost,deletecomment,showuserdata,follow, unfollow}=require('../function/features')
    
const {validateToken}=require("../middleware/validateToken") 

const features=express.Router();

features.use(validateToken);

features.post('/createpost',createpost)
features.post('/deletepost',deletepost)

features.post('/like',like)
features.post('/unlike',unlike)

features.post('/comment',comment)
features.post('/deletecomment',deletecomment)

features.post('/showuserdata',showuserdata)
features.post('/follow',follow)
features.post('/unfollow',unfollow)
features.post('/showpost',()=>{})


module.exports={features}