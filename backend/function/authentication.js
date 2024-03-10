require("dotenv").config();
const { User } = require("../models/User");
const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
//jwt use to validate user
var jwt = require('jsonwebtoken');
//npm i jsonwebtoken
let signature=process.env.JWT_TOKEN
const login=async (req,res)=>{
    const {email,password}=req.body;
  
    const user=await User.findOne({email});
    
    if(user==null)
    {
        return res.status(504).send("user not found")
    }
      //validating passowrd
  const passwordmatched=await bcrypt.compareSync(req.body.password,user.password);
  
  if(passwordmatched==true)
  {
   const payload={id:user.id} 
   const token = jwt.sign(payload, signature);

   //sending response
   return res.send({token,success:true});
  }
  return res.status(404).send({error: "either user or password is incorrect",success:false});
}
const logout=async (req,res)=>{
    res.status(200).send("logout");
}
const signup=async (req,res)=>{
    const {name,email,password,cpassword}=req.body

    //salt is combined with password to make it more confusing
    var salt = await bcrypt.genSaltSync(10);
    // encrypting pwd with salt and real password 
    var secPass = await bcrypt.hash(password,salt);
    
    const user = new User({name,email,password:secPass});
    user.save();

    console.log(name,email,password,cpassword,secPass)
       //creating jwt token
   const payload={id:user.id} 
   const token = jwt.sign(payload, signature);

   //sending response
   return res.send({token,success:true});
    //return res.status(200).send("signup");
}
const forgatepwd=(req,res)=>{
    res.status(200).send("forgatepwd");
}
module.exports={login,logout,signup,forgatepwd}