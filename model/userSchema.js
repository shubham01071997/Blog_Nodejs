const mangoes=require("mongoose");
const bcypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


const userSchema=new mangoes.Schema({
    name:{
       type:String,
       required:true
    },
    email:{
     type:String,
     required:true
    },
    password:{
     type:String,
     required:true
    },
    date:{
       type:Date,
       default:Date.now
    },
    tokens:[
       {
       token:{
       type:String,
       required:true
         }
      }
    ]
 });
 
 userSchema.pre('save',async function(next){
    if(this.isModified('password')){
           this.password=await bcypt.hash(this.password,12);
    }
    next();
 });
 userSchema.methods.generateAuthToken=async function(){
    try{
       let tokeng=jwt.sign({_id:this._id},process.env.SECRET_KEY);
       this.tokens=this.tokens.concat({token:tokeng});
       await this.save();
       return tokeng;
    }catch(err){
       console.timeLog(err);
    }
 }

const User=mangoes.model('USERDATA',userSchema);
module.exports=User;