const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("db connected");
})
.catch((e)=>{
    console.log(e);
})

module.exports=mongoose