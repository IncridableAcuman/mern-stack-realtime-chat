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
        enum:['admin','user']
    },
    avatar:{
        type:String,
    }

},{timestamps:true});

const User=model("User",userSchema);
module.exports=User;