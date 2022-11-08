const User = require('../models/User')
exports.register = async(req,res,next)=>{
    const {username , email , password }= req.body;
    try {
        const user = await User.create({
            username,
            email,
            password
        });
        res.status(201).json({
            succes: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            succes:false,
            error:error.message
        })
    }
};
exports.login = (req,res,next)=>{
    res.send("login route")
};
exports.forgotpassword = (req,res,next)=>{
    res.send("forgot password route")
};
exports.resetpassword = (req,res,next)=>{
    res.send("reset password route")
};