module.exports=class UserDTO{
    id;
    username;
    email;
    role;
    avatar;
    accessToken;
    refreshToken;
    constructor(model){
        this.id=model.id;
        this.username=model.username;
        this.email=model.email;
        this.role=model.role;
        this.avatar=model.avatar;
        this.accessToken=model.accessToken;
        this.refreshToken=model.refreshToken;
    }
}