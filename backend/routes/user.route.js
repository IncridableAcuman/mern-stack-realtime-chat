const { Router } = require('express');
const userController=require("../controllers/user.controller");
const protectMiddleware = require("../middlewares/protect.middleware");
const router=Router();

router.get("/me",protectMiddleware,userController.getUser);

module.exports=router;