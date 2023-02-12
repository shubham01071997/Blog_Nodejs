const express=require("express");
const User = require("../model/userSchema");
const bcypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const router=express.Router();
router.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;
     if(!name || !email || !password ){
        return res.status(420).json({error:"plz fill correct data"});
     }
     try{
     const userExist =await User.findOne({email:email});
     if(userExist){
       return res.status(422).json({error:"Email Already Exist"});
    }  
 
    const user=new User({name,email,password});
    const registerUser=await user.save();
    if(registerUser){
       res.status(201).json({message:"User Register Successfully"});
    }
     }catch(err){
       console.log(err);
     }
 });

 
router.post("/login",async (req,res)=>{
   try{
     let jwttoken;
     const {email,password}=req.body;
      if( !email || !password){
         return res.status(420).json({error:"plz fill correct data"});
      }

      const userLogin=await User.findOne({email:email});
     if(userLogin){
      const isMatch=await bcypt.compare(password,userLogin.password);
      jwttoken=await userLogin.generateAuthToken();

      if(!isMatch){
        res.json({message:"User login fail"});
      }else{
        res.json({message:"User login successfully",token:jwttoken});
      }
     }else{
        res.json({message:"User login fail"});
     }

   }catch(err){
     console.log(err);
   }
});

 module.exports=router;