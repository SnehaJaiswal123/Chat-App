const { default: mongoose } = require('mongoose');
const Chat = require('../Model/Chat');
const Message=require('../Model/Message')

const createMsg=async(req,res)=>{
    try{
        const {chatContent,chatId}=req.body;
        if(!chatContent||!chatId){
            return res.status(404).json({Success:false,message:"Provide all chat details"})
        }
        const newMsg=await Message.create({
            chatContent,
            chatId,
            sender:req.user._id
        })
        console.log(newMsg);
        return res.status(201).json({Success:true,message:"message saved",newMsg})
    }
    catch(err){
        res.status(500).json(err)
    }
}

const getAllMsg=async(req,res)=>{
    try{
          const chatId=req.params.id
          const chats=await Chat.aggregate([
            {
                $match:{
                   _id:new mongoose.Types.ObjectId(chatId)
                }
            },
            {
                $lookup:{
                    from:"messgaes",
                    localField:"_id",
                    foreignField:'chatId',
                    as:"messages"
                }
           }
          ])
          console.log(chats[0].messages);
          res.status(200).json({Success:true,message:chats,userId:req.user._id})
    }
    catch(err){
        console.log(err);
        res.status(500).json({Success:false,message:err})
    }
}

module.exports={createMsg,getAllMsg}