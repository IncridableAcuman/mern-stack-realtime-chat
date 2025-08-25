const userService = require("../services/user.service");

class UserController{
    async getUser(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const user = await userService.getUser(refreshToken);
            return res.json(user);
        } catch (error) {
            next(error);
            console.log(error)
        }
    }

}
module.exports=new UserController();