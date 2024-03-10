const mongoose = require("mongoose");

const commentschema=mongoose.Schema({
     user: {type: mongoose.Schema.Types.ObjectId , required: true},
     post: {type: mongoose.Schema.Types.ObjectId , required: true},
     date: { type: Date, default: Date.now  },
     desc: {type: String, required: true}
   })

const Comment = mongoose.model('comment', commentschema );

module.exports={Comment}