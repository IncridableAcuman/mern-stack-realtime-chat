const bcrypt=require('bcryptjs');
const tokenService=require("./token.service");
const mailService=require("./mail.service");
const User=require("../models/user.model");
const UserDTO=require("../DTO/user.dto");
const BaseError=require("../errors/BaseError");
class AuthService{
    // register
    async register(username,email,password){
        if(!username || !email || !password){
            throw BaseError.BadRequest("Username,Email,Password must be required");
        }
        const existUser = await User.findOne({email});
        if(existUser){
            throw BaseError.BadRequest("User already exist");
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=await User.create({username,email,password:hashedPassword});
        const userDTO=new UserDTO(user);
        const tokens=tokenService.generateTokens({...userDTO});
        await tokenService.saveToken(userDTO.id,tokens.refreshToken);
        return {userDTO,...tokens};
    }
    // login
    async login(email,password){
        if(!email || !password){
            throw BaseError.BadRequest("Email,Password must be required");
        }
        const user=await User.findOne({email});
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword){
            throw BaseError.BadRequest("Password not equal");
        }
        const userDTO=new UserDTO(user);
        const tokens=tokenService.generateTokens({...userDTO});
        await tokenService.saveToken(userDTO.id,tokens.refreshToken);
        return {userDTO,...tokens};
    }
    // refresh
    async refresh(refreshToken){
        if(!refreshToken){
            throw new BaseError.BadRequest("Token must be required");
        }
        const payload=tokenService.validateRefreshToken(refreshToken);
        const tokenDB=await tokenService.findToken(refreshToken);
        if(!payload || !tokenDB){
            throw BaseError.NotFound("Token not found");
        }
        const user=await User.findById(payload.id);
        const userDTO=new UserDTO(user);
        const tokens=tokenService.generateTokens({...userDTO});
        await tokenService.saveToken(userDTO.id,tokens.refreshToken);
        return {userDTO,...tokens};
    }
    // logout
    async logout(refreshToken){
        if(!refreshToken){
            throw new BaseError.BadRequest("Token must be required");
        }
        await tokenService.removeToken(refreshToken);
        return "User logged out";
    }
    // forgotPassword
    async forgotPassword(email){
        if(!email){
            throw BaseError.BadRequest("Email must be required");
        }
        const user=await User.findOne({email});
        if(!user){
            throw BaseError.NotFound("User not found");
        }
        const userDTO=new UserDTO(user);
        const tokens=tokenService.generateTokens({...userDTO});
        const url=`http://localhost:5173/reset-password?token=${tokens.accessToken}`;
        // mail service
        return "Reset password link sent to email";
    }
    // resetPassword
    async resetPassword(token,password){
        if(!token || !password){
            throw BaseError.BadRequest("Token,Password must be required");
        }
        const payload=tokenService.validateAccessToken(token);
        if(!payload){
            throw BaseError.Unauthorize();
        }
        const user=await User.findById(payload.id);
        if(!user){
            throw BaseError.Unauthorize();
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        user.password=hashedPassword;
        await user.save();
        return "Password updated successfully";
    }

}
module.exports=new AuthService();