const BaseError=require("../errors/BaseError");

module.exports=(er,req,res,next)=>{
    try {
        if(er instanceof BaseError){
            return res.status(er.status).json({message:er.errors,errors:er.errors});
        }
        next();
    } catch (error) {
        return res.status(500).json({success:false,message:"Server Xatosi",errors:error});
    }
}