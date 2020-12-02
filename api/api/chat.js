const express = require("express");
const { getChats, like, unlike } = require("../controllers/chat");
const requireLogin = require("../config/auth");

const router = express.Router();

router.get("/chat/:topicId", getChats);
router.put("/chat/like/:chatId/:communityId", requireLogin, like);
router.put("/chat/unlike/:chatId/:communityId", requireLogin, unlike);

module.exports = router;