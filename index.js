const express=require("express");
const dotenv=require("dotenv");
const cookieParser = require('cookie-parser');
const app=express();
dotenv.config({path:'config.env'});
require('./config');
const PORT=process.env.port;
app.use(express.json());
app.use(cookieParser());
app.use(require('./router/auth'));
app.use(require('./router/post'));

app.get("/signup",(req,res)=>{
    res.send("signup page"); 
});

app.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`);
});