const mongoose = require("mongoose");

const userschema=mongoose.Schema({
    name: {type:String , required: true},
    email: {type:String , required: true},
    password: {type:String , required: true},
    followers:[mongoose.Schema.Types.ObjectId],
    following: [mongoose.Schema.Types.ObjectId]
   })

const User = mongoose.model('user', userschema );

module.exports={User,userschema}