const bcrypt=require('bcryptjs');
const tokenService=require("./token.service");
const mailService=require("./mail.service");
const User=require("../models/user.model");
const Token = require("../models/token.model");
const UserDTO=require("../DTO/user.dto");
class AuthService{
    // register
    async register(username,email,password){
        if(!username || !email || !password){
            throw new Error("Username,Email,Password must be required");
        }
        const existUser = await User.findOne({email});
        if(existUser){
            throw new Error("User already exist");
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=await User.create({username,email,password:hashedPassword});
        const userDTO=new UserDTO(user);
        const tokens=await tokenService.generateTokens({...userDTO});
        await tokenService.saveToken(userDTO.id,tokens.refreshToken);
        return {userDTO,...tokens};
    }
    // login
    async login(email,password){

    }
    // refresh
    async refresh(refreshToken){

    }
    // logout
    async logout(refreshToken){

    }
    // forgotPassword
    async forgotPassword(email){

    }
    // resetPassword
    async resetPassword(token,password){

    }

}
module.exports=new AuthService();