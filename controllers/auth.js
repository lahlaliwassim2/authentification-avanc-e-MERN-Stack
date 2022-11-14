const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')
exports.register = async(req,res,next)=>{
    const {role,username , email , password }= req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
            role:"CLIENT"
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

exports.forgotpassword =async (req,res,next)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return next( new ErrorResponse("Email could not be sent",404))
        }
        const resetToken = user.getResetPasswordToken()
        await user.save()
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
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
            res.status(200).json({
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
exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
   
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
  
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return next(new ErrorResponse("Invalid Token", 400));
      }
  
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: user.getSignedToken(),
      });
    } catch (err) {
      next(err);
    }
  };
  const sendToken = (user,statusCode,res) =>{
    const token = user.getSignedToken(user)
    res.status(statusCode).json({succes:true , token})
}