
const mongoose=require('../Db/connect')

const MsgSchema=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    chatContent:{
        type:String,
        trim:true
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{
    timestap:true
})

const Messgae=mongoose.model('Messgae',MsgSchema)

module.exports=Messgae