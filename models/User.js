const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs')
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
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password ,salt)
    next();
});

UserSchema.methods.matchPasswords= async function(password) {
    return await bcrypt.compare(password, this.password);
}
const User = mongoose.model("User",UserSchema);

module.exports = User