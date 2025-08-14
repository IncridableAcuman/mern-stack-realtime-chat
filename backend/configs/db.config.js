const mongoose=require('mongoose');

module.exports = function db(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Connected Successfully"))
    .catch((er)=>console.log("Mongodb Connection Failed: ",er));
}