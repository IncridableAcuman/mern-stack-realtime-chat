const jwt=require('jsonwebtoken');
const Token=require("../models/token.model");

class TokenService{

    // generate tokens
    generateTokens(paylaod){
         const accessToken=jwt.sign(paylaod,process.env.ACCESS,{expiresIn:"15m"});
         const refreshToken=jwt.sign(paylaod,process.env.REFRESH,{expiresIn:"7d"});
          return {accessToken,refreshToken};
        
    }
    // save token to db
    async saveToken(userId,refreshToken){
        const existToken=await Token.findOne({user:userId});
        if(existToken){
            existToken.refreshToken=refreshToken;
            return await existToken.save();
        }
        const token=await Token.create({user:userId,refreshToken});
    }
    // find token from db
    async findToken(refreshToken){
        return await Token.findOne({refreshToken});
    }
    // remove token
    async removeToken(refreshToken){
        return await Token.findOneAndDelete({refreshToken});
    }
    // validate access token
    validateAccessToken(token){
        try {
            return jwt.verify(token,process.env.ACCESS);
        } catch (error) {
            return null;
        }
    }
    // validate refresh token
    validateRefreshToken(token){
        try {
            return jwt.verify(token,process.env.REFRESH);
        } catch (error) {
            return null;
        }
    }
}
module.exports=new TokenService();