require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express()
const connectDb = require('./config/db')
const errorHandler = require('./middleware/error')

//connect db 
connectDb();
app.use(cors())
app.use(express.json())

app.use("/api/auth",require('./routes/auth'))
app.use("/api/addlivreur",require('./routes/addlivreur'))

app.use('/api/private',require('./routes/private'))
/* A middleware that is used to handle errors. */
app.use(errorHandler)

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, ()=> console.log(`server runnig on port ${PORT}`));
process.on('unhandledRejection',(err,promise)=>{
    console.log(`logged Error : ${err}`);
    server.close(()=> process.exit(1))
})
module.exports=app