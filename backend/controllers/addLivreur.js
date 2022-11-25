const User = require("../models/User");
// import ErrorResponse from "../utils/errorResponse";
// import sendEmail from "../utils/sendEmail";
exports.addlivreur = async(req,res,next)=>{
    const {username , email , password,role }= req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
            role: "LIVREUR"
        });
        sendToken(user,201,res)
        
        
    } catch (error) {
      next(error)
    }
};

const sendToken = (user,statusCode,res) =>{
    const token = user.getSignedToken(user)
    res.status(statusCode).json({succes:true , token})
}

