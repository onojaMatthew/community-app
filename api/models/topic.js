const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const topicSchema = new Schema({
  title: { type: String, required: true },
  category: { type: ObjectId, ref: "ChatCategory", required: true },
  text: { type: String, required: true },
  like: [{ type: ObjectId, ref: "Community" }],
  liked: { type: Boolean, default: false },
  createdBy: { type: ObjectId, ref: "Community" },
  createdAt: { type: Date, default: Date.now() }
});

const Topic = mongoose.model("Topic", topicSchema);

exports.Topic = Topic;