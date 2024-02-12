const mongoose=require('../Db/connect')

const ChatSchema=mongoose.Schema({
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    latestMsg:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})

ChatSchema.virtual('messages',{
    ref:'messages',
    localField:'_id',
    foreignField:'chatId'
})

const Chat=mongoose.model('Chat',ChatSchema)

module.exports=Chat