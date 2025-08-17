const authService=require("../services/auth.service");

class AuthController{
    // register
    async register(req,res,next){
        try {
            const {username,email,password}=req.body;
            const user=await authService.register(username,email,password);
            return res.status(201).json({success:true,message:"Successfully",user:user});
        } catch (error) {
            next(error);
        }
    }
    // login
    async login(req,res,next){
        try {
            const {email,password}=req.body;
            const user=await authService.login(email,password);
            return res.status(200).json({success:true,message:"Successfully",user:user});
        } catch (error) {
            next(error);
        }
    }
    // refresh
    async refresh(req,res,next){
        try {
          const {refreshToken}=req.cookies;
          const user=await authService.refresh(refreshToken);
          return res.status(200).json({success:true,message:"Successfully",user:user});  
        } catch (error) {
            next(error);
        }
    }
    // logout
    async logout(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const user=await authService.logout(refreshToken);
            return res.status(200).json({success:true,message:"Successfully",user:user});  
        } catch (error) {
            next(error);
        }
    }
    // forgotPassword
    async forgotPassword(req,res,next){
        try {
           const {email}=req.body;
           const user=await authService.forgotPassword(email); 
           return res.status(200).json({success:true,message:"Successfully",user:user});
        } catch (error) {
            next(error);
        }
    }
    // resetPassword
    async resetPassword(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const {password}=req.body;
            const user=await authService.resetPassword(refreshToken,password);
            return res.status(200).json({success:true,message:"Successfully",user:user});
        } catch (error) {
            next(error);
        }
    }
}
module.exports=new AuthController();