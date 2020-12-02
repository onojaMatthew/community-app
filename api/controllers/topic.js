const { Topic } = require("../models/topic");

exports.newTopic = (req, res, next) => {
  const { title, text, category } = req.body;
  const { _id } = req.user;

  if (!title) return res.status(400).json({ error: "Topic title is required" });
  if (!category) return res.status(400).json({ error: "Topic category is required" });
  if (!text) return res.status(400).json({ error: "Text field is required" });

  let newTopic = new Topic({
    title,
    text,
    category,
    createdBy: _id
  });

  newTopic.save()
    .then(topic => {
      if (!topic) return res.status(400).json({ error: "Failed to create new topic" });
      res.json(topic);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.like = (req, res) => {
  const { communityId, topicId } = req.params;
  if (!communityId || !topicId) return res.status(400).json({ error: "Invalid params value" });

  Topic.findByIdAndUpdate({ _id: topicId }, { $push: { like: communityId }, $set: { liked: true }}, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.unlike = (req, res) => {
  const { communityId, topicId } = req.params;
  if (!communityId || !topicId) return res.status(400).json({ error: "Invalid params value" });

  Topic.findByIdAndUpdate({ _id: topicId }, { $pull: { like: communityId }, $set: { liked: false }}, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getTopics = (req, res) => {
  Topic.find({})
    .sort({ title: 1 })
    .populate("createdBy", "fullname phone email")
    .populate("category", "name description")
    .then(topics => {
      if (!topics) return res.status(400).json({ error: "No records found" });
      res.json(topics);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getTopic = (req, res) => {
  const { topicId } = req.params;

  if (!topicId) return res.status(400).json({ error: "Invalid parameter values" });

  Topic.findById({ _id: topicId })
    .populate("category", "name description")
    .then(topic => {
      if (!topic) return res.status(400).json({ error: "No records found" });
      res.json(topic);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getByCategory = (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) return res.status(400).json({ error: "Invalid parameter values" });
  Topic.find({ category: categoryId })
    .populate("category", "name description")
    .then(topics => {
      if (!topics) return res.status(400).json({ error: "No record match the requested category" });
      res.json(topics);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteTopic = (req, res) => {
  const { topicId } = req.params;
  if (!topicId) return res.status(400).json({ error: "Invalid parameter values" });
  Topic.findByIdAndDelete({ _id: topicId })
    .then(resp => {
      if (!resp) return res.status(400).json({ error: "Failed to delete topic" });
      res.json(resp);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}