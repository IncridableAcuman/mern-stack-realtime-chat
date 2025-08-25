const express=require('express');
const cors=require('cors');
require('dotenv').config();
const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');
const {app,server} = require("./configs/socket.config");

// local
const db=require('./configs/db.config');
// middleware
const errorMiddleware=require("./middlewares/error.middleware");
// routes
const authRoutes=require("./routes/auth.route");
const userRoutes=require("./routes/user.route");
const messageRoutes=require("./routes/message.route");
const chatRoutes=require("./routes/chat.route");


app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    limits:5*1024*1024,
    
}));
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/chats",chatRoutes);

// error
app.use(errorMiddleware);
const port=process.env.PORT || 4000;

// connection database
db();
// brauser port
server.listen(port,()=>{
    console.log(`Server is running on ${port}...`);
})