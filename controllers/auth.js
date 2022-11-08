const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
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
exports.login = async (req,res,next)=> {
    const {email, password} = req.body
    if(!email || !password){
       return next(new ErrorResponse('mot de passe ola email makaynch ',400))
    }
        try {
            const user = await User.findOne({email}).select("password")
            if(!user){
                res.status(404).json({
                    succes:false,
                    error: "Invalid credentials"
                })
            }
            const isMatch = await user.matchPasswords(password);
            if(!isMatch){
                res.status(404).json({
                sucees:false,
                error: "Invalid credentials"
                })
            }
            res.status(200).json({
                succes:true,
                token:"trhdkcdjclc"
            });
        } catch (error) {
            res.status(500).json({
                succes:false,
                error:error.message
            })
        }
    
};
exports.forgotpassword = (req,res,next)=>{
    res.send("forgot password route")
};
exports.resetpassword = (req,res,next)=>{
    res.send("reset password route")
};