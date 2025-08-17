const { Router } = require('express');
const authController=require("../controllers/auth.controller");
const router=Router();

router.post("/register",authController.register);
router.post("/login",authController.login);
router.get("/refresh",authController.refresh);
router.delete("/logout",authController.logout);
router.post("/forgot-password",authController.forgotPassword);
router.put("/reset-password",authController.resetPassword);

module.exports=router;