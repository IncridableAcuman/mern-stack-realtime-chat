const User = require("../models/user.model");
const Message = require("../models/message.model");
const fileService = require("./file.service");
const BaseError = require("../errors/BaseError");
const {io,getRecevierSocketId} = require("../configs/socket.config");

class MessageService{

    async getUsersForSidebar(userId){
        const users = await User.find({ id: {$ne:userId} }).select("-password");
        if(users.length==0 || users==[]){
            throw BaseError.NotFound("Users not found");
        }
        return users;
    }

    async getMessages(userId,userToChatId){
        const messages = await Message.find({
            $or:[
                {senderId:userId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:userId}
            ]
        });
        return messages;
    }

    async sendMessage(senderId,receiverId,text,image){

        if(!senderId || !receiverId || !text || !image){
            throw BaseError.BadRequest("Error");
        }

        const imageData=image? await fileService.toDB(image):null;

        const message= new Message({senderId,receiverId,text,image:imageData});
        await message.save();

        const receiverSocketId=getRecevierSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverId).emit("newMessage",message);
        }
        return message;
    }

}
module.exports=new MessageService();