const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const chatCategoryShema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: ObjectId, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const ChatCategory = mongoose.model("ChatCategory", chatCategoryShema);

exports.ChatCategory = ChatCategory;