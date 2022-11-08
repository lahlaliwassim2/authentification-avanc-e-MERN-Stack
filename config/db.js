const mongoose = require('mongoose')

const connectDb = async()=>{
    await mongoose.connect(process.env.URI,
    {   
        useNewUrlParser:true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: true
    })
    console.log("db connected")
}


module.exports=connectDb;