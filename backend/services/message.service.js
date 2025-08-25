const User = require("../models/user.model");
const Message = require("../models/message.model");
const BaseError = require("../errors/BaseError");
const {io,getRecevierSocketId} = require("../configs/socket.config");

class MessageService{

    async getUsersForSidebar(userId){
        const users = await User.find({ _id: {$ne:userId} }).select("-password");
        return users;
    }

    async getMessages(userId,userToChatId){
        const messages = await Message.find({
            $or:[
                {senderId:userId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:userId}
            ]
        }).sort({createdAt:1});
        return messages;
    }

    async sendMessage(senderId,receiverId,text){
        if(!text){
            throw BaseError.BadRequest("No text provided");
        }
        const receiver = await User.findById(receiverId);
        if(!receiver) throw BaseError.NotFound("Receiver not found");

        const message= new Message({senderId,receiverId,text});
        await message.save();

        const receiverSocketId=getRecevierSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",message);
        }
        return message;
    }

}
module.exports=new MessageService();