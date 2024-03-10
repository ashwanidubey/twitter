//mongoose connection
const mongoose = require("mongoose");

const connectToMongo=()=>{
         mongoose.connect('mongodb://127.0.0.1:27017/twitter')
         //mongoose.connect('mongodb+srv://ashwani786dubey:otherattherate1234G@cluster0.1pw2eva.mongodb.net/twitter')
        .then(()=>{
            console.log("connected to mongo sucsesfully")
        })
        .catch(()=>{
            console.log("connected to mongo failed")
        }) 

}

module.exports={connectToMongo}