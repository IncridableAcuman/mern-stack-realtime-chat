const { Router } = require('express');
const messageController = require("../controllers/message.controller");
const protected = require("../middlewares/protect.middleware");

const router=Router();

router.get("/users",protected,messageController.getUsersForSidebar);
router.get("/all",protected,messageController.getMessages);
router.post("/send",protected,messageController.sendMessage);

module.exports=router;