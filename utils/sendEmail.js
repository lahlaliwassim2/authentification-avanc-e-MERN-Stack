const nodemailer = require('nodemailer')

const sendEmail = (options)=>{
    const transporter = nodemailer.createTransport({
        service:'SendGrid',
        auth:{
    user: "apiKey",
    pass: "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"
 }   
 })
 const mailOptions = {
    from:process.env.EMAIL_FROM,
    to:options.to,
    subject:options.subject,
    html:options.text
 }
 transporter.sendMail(mailOptions, function(err, info){
    if(err){
        console.log(err)
    }else{
        console.log(info)
    }
 })
}
module.exports=sendEmail
