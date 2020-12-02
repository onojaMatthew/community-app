const { Category } = require("../models/category");

exports.create = (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;
  const { role, adminId } = req.params;

  if (!name) return res.status(400).json({ error: "Category must have a name" });
  if (!role || !adminId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!role) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin" && role !== "super_admin") return res.status(400).json({ error: "Only super admin and admin can perform this operation" });
  if (adminId !== _id) return res.status(400).json({ error: "Unauthorized access. Please be sure you have the right permit" });

  Category.findOne({ name })
    .then(category => {
      if (category) return res.status(400).json({ error: "Category already exists" });
      let newCategory = new Category({ name, createdBy: req.user._id });
      newCategory.save()
      return res.json({ message: "Category added successfully", newCategory });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.getCategory = (req, res) => {
  const { _id } = req.user;
  if (!_id) return res.status({ error: "Unauthorized access. Please log in to continue" });

  Category.find({})
    .select("name _id createdBy createdAt")
    .populate("createdBy", "firstName lastName _id email phone role")
    .then(categories => {
      if (!categories) return res.status(400).json({ error: "Category list empty." });
      res.json(categories);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.updateCategory = (req, res) => {
  const { _id } = req.user;
  const { name, categoryId } = req.body;
  const { role, adminId } = req.params;

  if (!name) return res.status(400).json({ error: "Category must have a name" });
  if (!role || !adminId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!role) return res.status(400).json({ error: "Unknown user role" });
  if (role !== "admin" && role !== "super_admin") return res.status(400).json({ error: "Only super admin and admin can perform this operation" });
  if (adminId !== _id) return res.status(400).json({ error: "Unauthorized access. Please be sure you have the right permit" });
  Category.findByIdAndUpdate({ _id: categoryId })
    .then(category => {
      if (!category) return res.status(400).json({ error: "Cateory not found" });
      if (req.body.name) category.name = req.body.name;
      category.updatedBy = req.user._id;
      category.updatedAt = Date.now();
      category.save();
      return res.json({ message: "Success", category });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.deleteCategory = (req, res) => {
  const { categoryId, role } = req.params;
  
  if (!categoryId || !role) return res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "super_admin" && role !== "admin") return res.status(400).json({ error: "You do not have access to delete categories" });
  if (!categoryId) return res.status(400).json({ error: "You must select a category" });

  Category.findByIdAndDelete({ _id: categoryId })
    .then(category => {
      if (!category) return res.status(400).json({ error: "Failed to delete. Category not found" });
      return res.json({ message: "Successfully deleted" });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}