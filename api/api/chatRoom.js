const express = require("express");
const {
  createChatRoom,
  getRoom,
  deleteRoom,
} = require("../controllers/chatRoom");
const requireLogin = require("../config/auth");
const router = express.Router();

// router.get("/room", getRoom);
// router.post("/room", createChatRoom);
router.delete("/room/delete/:roomId", deleteRoom);

module.exports = router;