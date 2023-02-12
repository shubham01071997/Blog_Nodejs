const mangoes=require("mongoose");

const db=process.env.db;
mangoes.set("strictQuery", false);
mangoes.connect(db).then(()=>{
    console.log('connection successfully');
}).catch((err)=>{
   console.log(err);
    console.log('connection fail');
}
);
