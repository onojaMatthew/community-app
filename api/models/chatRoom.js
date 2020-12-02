const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const chatRoomSchema = new Schema({
  room: { type: String, required: true },
  socketId: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: ObjectId, ref: "Community", required: true },
  createdAt: { type: Date, default: Date.now() },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

exports.ChatRoom = ChatRoom;