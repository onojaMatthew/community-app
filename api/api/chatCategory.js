const express = require("express");
const requireLogin = require("../config/auth");
const {
  post,
  getAll,
  getCategory,
  deleteCategory
} = require("../controllers/chatCategory");

const router = express.Router();

router.post("/chatcat/post", requireLogin, post);
router.get("/chatcat/all", getAll);
router.get("/chatcat/:categoryId", getCategory);
router.delete("/chatcat/delete/:categoryId", requireLogin, deleteCategory);

module.exports = router;