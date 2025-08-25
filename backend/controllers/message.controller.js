const messageService = require("../services/message.service");

class MessageController{

    async getUsersForSidebar(req,res,next){
        try {
            const {id}=req.user;
            const message = await messageService.getUsersForSidebar(id);
            return res.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    async getMessages(req,res,next){
        try {
            const {id}=req.params;
            const userId=req.user.id;
            const messages = await messageService.getMessages(userId,id);
            return res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    }

    async sendMessage(req,res,next){
        try {
            const {text}=req.body;
            const image=req?.files?.image;
            const id=req.params.id;
            const senderId=req.user.id;
            if(!image){
                return res.status(400).json({content:"Image is required"});
            }
            const message = await messageService.sendMessage(senderId,id,text,image);
            return res.json(message);
        } catch (error) {
            next(error);
        }
    }

}
module.exports=new MessageController();