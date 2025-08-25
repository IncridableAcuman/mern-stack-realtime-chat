const BaseError=require("../errors/BaseError");
class FileService{
    async toDB(file){
        try {
            if(!file || !file.data){
                throw BaseError.BadRequest("No file provided");
            }
            return {
                data:file.data,
                contentType:file.mimeyype
            }
        } catch (error) {
            throw BaseError.BadRequest(`Error saving file: ${error}`);
        }
    }
}
module.exports=new FileService();