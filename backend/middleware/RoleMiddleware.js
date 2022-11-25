const jwt = require('jsonwebtoken')
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.admin = async (req,res,next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    )
     {

        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next(new ErrorResponse("Not authorized to acces this route",401))
    }
    try {
        const decod= jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decod.id)
        if(!user){
            return next(new ErrorResponse("not user found"),404)
        }
        if(user.role==="ADMIN"){ 
            return next()
        }
        else{
            return next(new ErrorResponse("You Are Not admin ",404))
        }
        
    } catch (error) {
        return next(new ErrorResponse("Not authorized to acces with this route"),404)
    }
}
