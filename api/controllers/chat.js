const { Chat } = require("../models/chat");

exports.like = (req, res) => {
  const { communityId, chatId } = req.params;
  if (!communityId || !chatId) return res.status(400).json({ error: "Invalid params value" });

  Chat.findByIdAndUpdate({ _id: chatId }, { $push: { like: communityId }, $set: { liked: true }}, { new: true })
    .then(result => {
      res.json("liked success!!")
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    })
}

exports.unlike = (req, res) => {
  const { communityId, chatId } = req.params;
  if (!communityId || !chatId) return res.status(400).json({ error: "Invalid params value" });

  Chat.findByIdAndUpdate({ _id: chatId }, { $pull: { like: communityId }, $set: { liked: false }}, { new: true })
    .then(result => {
      res.json("liked success!!")
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    })
}

exports.getChats = (req, res) => {
  const { topicId } = req.params;

  if (!topicId) return res.status(400).json({ error: "Invalid parameter value" });
  
  Chat.find({ topicId })
    .then(chat => {
      if (!chat) return res.status(400).json({ error: "Chat record is empty" });
      res.json(chat);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getMessages = async (messageId) => {
  if (!messageId) return { error: "Message is not found" };
  let messages = await Chat.find({ room: topicId });
  if (!messages) return { error: "Message list is empty" };
  return messages;
}

exports.deleteMessage = async (messageId) => {
  if (!messageId) return { error: "Message not found" };
  let message = await Chat.findByIdAndDelete({ _id: messageId });
  return { message };
}