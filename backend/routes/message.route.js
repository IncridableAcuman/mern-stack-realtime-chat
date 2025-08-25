const { Router } = require('express');
const messageController = require("../controllers/message.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router=Router();

router.get("/users",authMiddleware,messageController.getUsersForSidebar);
router.get("/:id",authMiddleware,messageController.getMessages);
router.post("/send/:id",authMiddleware,messageController.sendMessage);

module.exports=router;