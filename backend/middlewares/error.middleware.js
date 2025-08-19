const BaseError=require("../errors/BaseError");

module.exports=(er,req,res,next)=>{
    try {
        if(er instanceof BaseError){
            return res.status(er.status).json({message:er.message,errors:er.errors});
        }
        next();
    } catch (error) {
        return res.status(500).json({success:false,message:"Server Error",errors:error});
    }
}