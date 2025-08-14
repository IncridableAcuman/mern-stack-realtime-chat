const jwt=require('jsonwebtoken');
const bcrypt=require("bcryptjs");

class TokenService{

    generateAccessToken(paylaod){
        try {
         return jwt.sign(paylaod);
        } catch (error) {
            throw new Error("Something went wrong with token");
            console.log(error);
        }
    }
    generateRefreshTokensToken(paylaod){
        try {
         return jwt.sign(paylaod);
        } catch (error) {
            throw new Error("Something went wrong with token");
            console.log(error);
        }
    }

}
module.exports=new TokenService();