const { Schema, model } = require("mongoose");

const messageSchema=new Schema({

},{timestamps:true});
const Message=model("Message",messageSchema);
module.exports=Message;