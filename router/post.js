const express=require("express");
const Post=require("../model/postSchema");
const postrouter=express.Router();
const authenticateUser=require("../authenticate/authenticate");

postrouter.post("/savePost",async (req,res)=>{
    const {userId,post}=req.body;
     if(!userId || !post ){
        return res.status(420).json({error:"plz fill correct data"});
     }
     try{
    const postData=new Post({userId,post});
    const savePost=await postData.save();
    if(savePost){
       res.status(201).json({message:"Post Save Successfully"});
    }
   }catch(err){
       console.log(err);
     }
 });
//get all post
 postrouter.get("/getAllPost",async (req,res)=>{
    try{
        const AllPost=await Post.find({})
        res.status(201).json(AllPost);
    }catch(err){
        res.status(400).json({message:err});
         }
    });

//find by post id
postrouter.get("/getPostData/:id",async (req,res)=>{
    const _id=req.params.id;
    try{
        const getPost=await Post.findById({_id:_id});
        res.status(201).json(getPost);
    }catch(err){
        res.status(400).json({message:err});
         }
    });

//find post using userId
postrouter.get("/getPostUser/:id",async (req,res)=>{
    const userId=req.params.id;
    try{
        const getPost=await Post.find({userId:userId});
        res.status(201).json(getPost);
    }catch(err){
        res.status(400).json({message:err});
         }
    });

//Delete a post
postrouter.delete("/deletePost/:id",authenticateUser,async (req,res)=>{
    const _id=req.params.id;
    try{
        const getPost=await Post.findById({_id:_id});
        if(req.userId.toString()===getPost.userId){
        const deletePost=await Post.findByIdAndDelete({_id:_id});
        res.status(200).json({message:"Delete Data Successfully"});
        }else{
            res.status(401).json({message:"User Not Authenticated"}) 
        }
    }catch(err){
        res.status(400).json({message:err});
         }
    });

 //update
postrouter.patch("/updatePost/:id",authenticateUser,async (req,res)=>{
    const _id=req.params.id;
    const {userId,post}=req.body;
    const getPost=await Post.findById({_id:_id});
    try{
        if(req.userId.toString()===getPost.userId){
            const UpdateData=await Post.findByIdAndUpdate(_id,req.body,{
              new:true
            });    
            res.status(201).json({message:"Post Update Successfully"});
        }else{
           res.status(401).json({message:"User Not Authenticated"});
    }
    }catch(err){
        res.status(400).json({message:err});
    }
});   
    
module.exports=postrouter;