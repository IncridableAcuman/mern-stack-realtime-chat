const { Schema, model } = require("mongoose");

const chatSchema=new Schema({

},{timestamps:true});
const Chat=model("Chat",chatSchema);
module.exports=Chat;