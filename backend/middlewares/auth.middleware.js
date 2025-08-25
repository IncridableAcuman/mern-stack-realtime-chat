const BaseError=require("../errors/BaseError");
const tokenService=require("../services/token.service");
const User=require("../models/user.model");

module.exports = async (req,res,next)=>{
    try {
        const {refreshToken}=req.cookies;
        if(!refreshToken || refreshToken==null){
            return next(BaseError.Unauthorize());
        }
        const payload = tokenService.validateRefreshToken(refreshToken);
        const tokenDB = await tokenService.findToken({refreshToken});
        if(!payload || !tokenDB){
            return next(BaseError.Unauthorize());
        }
        const user=await User.findById(payload.id);
        if(!user){
            return next(BaseError.Unauthorize());
        }
        req.user=user;
        next();
    } catch (error) {
        next(BaseError.Unauthorize());
    }
}