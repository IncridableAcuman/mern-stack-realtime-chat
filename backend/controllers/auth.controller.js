const authService=require("../services/auth.service");

class AuthController{
    // register
    async register(req,res,next){
        try {
            const {username,email,password}=req.body;
            const user=await authService.register(username,email,password);
            res.cookie("refreshToken",user.refreshToken,{httpOnly:true,maxAge:process.env.REFRESH_TIME});
            return res.status(201).json(user);
        } catch (error) {
            next(error);
            console.error("Error in register:", error);
        }
    }
    // login
    async login(req,res,next){
        try {
            const {email,password}=req.body;
            const user=await authService.login(email,password);
            res.cookie("refreshToken",user.refreshToken,{httpOnly:true,maxAge:process.env.REFRESH_TIME});
            return res.status(200).json(user);
        } catch (error) {
            next(error);
            console.error("Error in login:", error);
        }
    }
    // refresh
    async refresh(req,res,next){
        try {
          const {refreshToken}=req.cookies;
          const user=await authService.refresh(refreshToken);
          res.cookie("refreshToken",user.refreshToken,{httpOnly:true,maxAge:process.env.REFRESH_TIME});
          return res.status(200).json(user);
        } catch (error) {
            next(error);
            console.error("Error in refresh:", error);
        }
    }
    // logout
    async logout(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const user=await authService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    // forgotPassword
    async forgotPassword(req,res,next){
        try {
           const {email}=req.body;
           const user=await authService.forgotPassword(email); 
           return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    // resetPassword
    async resetPassword(req,res,next){
        try {
            const {accessToken,password}=req.body;
            const user=await authService.resetPassword(accessToken,password);
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
module.exports=new AuthController();