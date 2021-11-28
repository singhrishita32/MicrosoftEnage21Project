const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
require('dotenv').config()
const Admin=require('../Models/Admin')
//ADMIN SIGNUP
exports.signup = async (req, res) => {
   
    const adminExists = await Admin.findOne({ email: req.body.email })
    if (adminExists)
        return res.status(403).json({ error: "Email taken" });
    
    const admin = await new Admin(req.body)
    await admin.save();
    
        res.status(200).json("Added!");
}
//ADMIN SIGNIN
exports.signinAdmin = (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    Admin.findOne({email}, (err,admin)=>{
        if(err || !admin)
            return res.status(401).json({error: "Email does not exist!"})
    
        if(!admin.authenticate(password))
            return res.status(401).json({error: "Email and password do not match"});


        const token = jwt.sign({_id: admin._id},process.env.JWT_SECRET);
        res.cookie("t", token, { expire: new Date() + 0 })
        const { _id, name, email } = admin

        var crypto = require('crypto');
        var assert = require('assert');

        var algorithm = 'aes256';
        var key = 'password';
      
        //PASSWORD IS STORED IN ENCRYPTED FORM IN DATABASE
        var cipher = crypto.createCipher(algorithm, key);  
        var type = cipher.update("Admin", 'utf8', 'hex') + cipher.final('hex');
        var decipher = crypto.createDecipher(algorithm, key);
        var decrypted = decipher.update(type, 'hex', 'utf8') + decipher.final('utf8');
        return res.json({token,user: {_id,name,email,type}}); 
   })
}



