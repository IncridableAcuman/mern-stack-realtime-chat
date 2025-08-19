const { Schema, model } = require("mongoose");

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:50,
        trim:true
    },
    email:{
        type:String,
        required:true, 
        unique:true 
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:1024,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPHQFlgR41M5dCP-eMsO0EcjUw86A_Zag3sg&s"
    }

},{timestamps:true});

const User=model("User",userSchema);
module.exports=User;