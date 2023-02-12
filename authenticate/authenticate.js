const jwt=require("jsonwebtoken");
const User = require("../model/userSchema");
const Authenticate=async (req,res,next)=>{
    try{
        const token=req.headers["token"];
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const rootuser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootuser){
            throw new Error('User Not Found'); 
        }
        req.token=token;
        req.rootUser=rootuser;
        req.userId=rootuser._id;
        next();
    }catch(err){
        console.log(err);
       res.status(401).send("unauthorized number token provided");
    }

}
module.exports=Authenticate;