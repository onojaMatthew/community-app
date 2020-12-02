const express = require("express");
const requireLogin = require("../config/auth");

const {
  create,
  updateCategory,
  deleteCategory,
  getCategory
} = require("../controllers/category")

const router = express.Router();

router.post("/category/:adminId/:role", requireLogin, create);
router.get("/category", requireLogin, getCategory);
router.put("/category/:adminId/:role", requireLogin, updateCategory);
router.delete("/category/:categoryId/:role", requireLogin, deleteCategory)

module.exports = router;