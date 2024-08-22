const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const connectDb = require('../Config/Dbconnection');

const app = express();
connectDb();

const port =process.env.PORT || 3002;
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/user',require("./routes/userRoutes"))
app.listen(port,()=>{
    console.log(`server is running ${port}` )
})