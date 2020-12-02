const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const chatSchema = new Schema({
  topicId: { type: ObjectId, ref: "Topic", required: true },
  username: { type: String, required: true },
  senderId: { type: ObjectId, ref: "Community", required: true },
  text: { type: String, required: true },
  like: [{ type: ObjectId, ref: "Community" }],
  liked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() }
});

const Chat = mongoose.model("Chat", chatSchema);

exports.Chat = Chat;