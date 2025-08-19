const {body} = require('express-validator');
const { Router } = require('express');
const authController=require("../controllers/auth.controller");
const router=Router();

router.post("/register",
    body("username").isLength({min:3,max:50}),
    body("email").isEmail(),
    body("password").isLength({min:8,max:1024}),
    authController.register);
router.post("/login",
    body("email").isEmail(),
    body("password").isLength({min:8,max:1024}),
    authController.login);
router.get("/refresh",authController.refresh);
router.delete("/logout",authController.logout);
router.post("/forgot-password",body("email").isEmail(),authController.forgotPassword);
router.put("/reset-password",body("password").isLength({min:8,max:1024}),authController.resetPassword);

module.exports=router;