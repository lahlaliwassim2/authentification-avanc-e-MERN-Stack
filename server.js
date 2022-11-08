require('dotenv').config()
const express = require('express');
const app = express()
const connectDb = require('./config/db')

//connect db 
connectDb();

app.use(express.json())
app.use("/api/auth",require('./routes/auth'))

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=> console.log(`server runnig on port ${PORT}`));
