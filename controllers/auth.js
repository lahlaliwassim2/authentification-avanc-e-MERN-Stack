const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
exports.register = async(req,res,next)=>{
    const {username , email , password }= req.body;
    try {
        const user = await User.create({
            username,
            email,
            password
        });
        sendToken(user,201,res)
    } catch (error) {
      next(error)
    }
};
exports.login = async (req,res,next)=> {
    const {email, password} = req.body
    if(!email || !password){
       return next(new ErrorResponse('Please Provid email and passworrd  ',400))
    }
        try {
            const user = await User.findOne({email}).select("password")
            if(!user){
                return next(new ErrorResponse('invalid Credentials',401))

            }
            const isMatch = await user.matchPasswords(password);
            if(!isMatch){
                return next(new ErrorResponse('invalid Credentials ',401))

            }
           sendToken(user,200,res)
        } catch (error) {
            res.status(500).json({
                succes:false,
                error:error.message
            })
        }
    
};
const sendToken = (user,statusCode,res) =>{
    const token = user.getSignedToken(user)
    res.status(statusCode).json({succes:true , token})
}
exports.forgotpassword =async (req,res,next)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return next( new ErrorResponse("Email could not be sent",404))
        }
        const resetToken = user.getResetPasswordToken()
        await user.save()
        const resetUrl = `http://localhost:3000/passwordreser/${resetToken}`
        const message = `
            <h1> You have requested a password reser</h1>
            <p>please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `
        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });
            res.status(200).status({
                succes:true,
                data: "email envoyer par succes"
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            user.save()
            
            return next(new ErrorResponse("email non envoyer",500))
        }

    } catch (error) {
        next(error)
    }
};
exports.resetpassword = (req,res,next)=>{
    res.send("reset password route")
};