//jwt use to validate user
var jwt = require('jsonwebtoken');
require("dotenv").config();
const validateToken=async (req,res,next)=>{
    try{
      let signature=process.env.JWT_TOKEN
      const token=req.header('token');
      let data=jwt.verify(token,signature)
      req.userid=data.id ;  
      next()
    }
    catch{
        return res.status(401).send({error : "invalid token 2"});
    }
}

module.exports={validateToken}


