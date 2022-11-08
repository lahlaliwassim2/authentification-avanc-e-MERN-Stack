const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "please provide a username"]
    },
    email:{
        type:String,
        required: [true,"Please provide a email"],
        unique:true,
        match:[
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9 ]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{ 1,3})(\]?)$/,
            "please provide a valid email"
        ]
    },
    password:{
        type:String,
        required: [true , "please add a password"],
        minlenght: 6,
        select: false

    },
    resetPasswordToken: String,
    resetPasswordExpire:Date
});
const User = mongoose.model("User",UserSchema);

module.exports = User