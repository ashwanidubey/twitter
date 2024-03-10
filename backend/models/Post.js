const mongoose = require("mongoose");

const postschema=mongoose.Schema({
     user: {type: mongoose.Schema.Types.ObjectId , required: true},
     date: { type: Date, default: Date.now  },
     likes: [mongoose.Schema.Types.ObjectId],
     comments: [mongoose.Schema.Types.ObjectId],
     image_url: String,
     desc: String
   })

const Post = mongoose.model('post', postschema );

module.exports={Post}