const messageService = require("../services/message.service");

class MessageController{

    async getUsersForSidebar(req,res,next){
        try {
            const {senderId}=req.body;
            const message = await messageService.getUsersForSidebar(senderId);
            return res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    async getMessages(req,res,next){
        try {
            const {senderId,receiverId}=req.body;
            const messages = await messageService.getMessages(senderId,receiverId);
            return res.status(200).json(messages);
        } catch (error) {
            next(error);
            console.log(error);
        }
    }

    async sendMessage(req,res,next){
        try {
            const {senderId,receiverId,text}=req.body;
            const message = await messageService.sendMessage(senderId,receiverId,text);
            return res.json(message);
        } catch (error) {
            next(error);
        }
    }

}
module.exports=new MessageController();