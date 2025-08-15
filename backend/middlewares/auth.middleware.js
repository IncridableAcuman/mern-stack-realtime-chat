const BaseError=require("../errors/BaseError");

module.exports=(req,res,next)=>{
    try {
        
    } catch (error) {
        next(BaseError.Unauthorize());
    }
}