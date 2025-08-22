const User=require("../models/user.model");
const AuthDTO=require("../DTO/auth.dto");
const tokenService=require("./token.service");
const BaseError=require("../errors/BaseError");

class UserService{
    // get me
    async getUser(refreshToken){
        const payload=tokenService.validateRefreshToken(refreshToken);
        if(!payload){
            throw BaseError.Unauthorize();
        }
        const user = await User.findById(payload.id);
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        const authDTO=new AuthDTO(user);
        return authDTO;
    }
    // update user profile
    

}
module.exports=new UserService();