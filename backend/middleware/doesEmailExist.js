const { User } = require("../models/User");
const mongoose = require("mongoose");

const doesEmailExist=async (req,res,next)=>{
   const {name,email,password,cpassword}=req.body
   //return next()
   const users=await User.find({email});

   if(users.length==0)
   {
      return next()
   }
   return res.status(504).send({message:"user already exist",status:false});
}

module.exports={doesEmailExist}