const checkSignupFormate = (req, res, next) => {
    const { name, email, password, cpassword } = req.body
    console.log(name, email, password, cpassword)
    if (password !== cpassword) {
        return res.status(504).send({message:"password is not matching pls check",status:false})
    }
    if (name.length < 4) {
        return res.status(504).send({message:"please eneter a valid name",status:false})
   
    }
    if (!email.includes("@")) {
        return res.status(504).send({message:"please eneter a valid email",status:false})
     
    }
    next();
}

module.exports = { checkSignupFormate }