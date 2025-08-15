module.exports=class BaseError extends Error{
    status;
    errors;
    errors
    constructor(status,message,errors=[]){
        super(message);
        this.status=status;
        this.errors=errors;
    }
    static BadRequest(message,errors=[]){
        return new BaseError(400,message,errors);
    }
    static Unauthorize(){
        return new BaseError(401,"Unauthoeize");
    }
    static NotFound(message,errors=[]){
        return new BaseError(404,message,errors);
    }
}