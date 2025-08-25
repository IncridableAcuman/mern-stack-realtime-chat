const BaseError=require("../errors/BaseError");
const tokenService = require("../services/token.service");

module.exports=(req,res,next)=>{
    try {
        const authorization=req.headers.authorization;
        if(!authorization){
            return next(BaseError.Unauthorize());
        }
        const accessToken=authorization.split(" ")[1];
        if(!accessToken){
            return next(BaseError.Unauthorize());
        }
        const userData=tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(BaseError.Unauthorize());
        }
        req.user=userData.id;
        next();
    } catch (error) {
        return next(BaseError.Unauthorize());
    }
}