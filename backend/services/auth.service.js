const tokenService=require("./token.service");
const mailService=require("./mail.service");
class AuthService{
    // register
    async register(username,email,password){

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