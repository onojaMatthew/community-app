const { ChatCategory } = require("../models/chatCategory");

exports.post = (req, res) => {
  const { name, description } = req.body;
  const { _id } = req.user;

  if (!_id) return res.status(400).json({ error: "Unauthorized access. Please login properly" });
  if (!name) return res.status(400).json({ error: "Name is required" });
  if (!description) return res.status(400).json({ error: "Description required" });
  ChatCategory.findOne({ name: name })
    .then(category => {
      if (category) return res.status(400).json({ error: "Category already exists" });
      let newChatCategory = new ChatCategory({ name, description, createdBy: _id });
      newChatCategory.save();
      res.json(newChatCategory);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
    
}

exports.getAll = (req, res) => {
  ChatCategory.find({})
    .sort({ name: 1 })
    .then(category => {
      if (!category) return res.status(400).json({ error: "List empty" });
      res.json(category);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.getCategory = (req, res) => {
  const { categoryId } = req.params;
  if(!categoryId) return res.status(400).json({ error: "Invalid parameter value" });
  ChatCategory.findById({ _id: categoryId })
    .then(category => {
      if (!category) return res.status(400).json({ error: "Request failed. Not found" });
      res.json(category);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.deleteCategory = (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId) return res.status(400).json({ error: "Invalid parameter value" });
  ChatCategory.findByIdAndDelete({ _id: categoryId }, (err, doc) => {
    if (err || !data) return res.status(400).json({ error: err.message });
    res.json(doc);
  });
}