const express=require('express');
const cors=require('cors');
require('dotenv').config();
const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');

// local
const db=require('./configs/db.config');
// middleware
const errorMiddleware=require("./middlewares/error.middleware");
// routes
const authRoutes=require("./routes/auth.route");
const userRoutes=require("./routes/user.route");
const messageRoutes=require("./routes/message.route");
const chatRoutes=require("./routes/chat.route");

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/chat",chatRoutes);

// error
app.use(errorMiddleware);
const port=process.env.PORT || 4000;

// connection database
db();
// brauser port
app.listen(port,()=>{
    console.log(`Server is running on ${port}...`);
})