const mangoes=require("mongoose");

const postSchema=new mangoes.Schema({
    userId:{
       type:String,
       required:true
    },
    post:{
     type:String,
     required:true
    },
    date:{
       type:Date,
       default:Date.now
    },
 });

const Post=mangoes.model('POSTDATA',postSchema);
module.exports=Post;