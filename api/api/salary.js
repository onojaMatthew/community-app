const express = require("express");
const {
  create,
  getSalary,
  updateSalary,
  deleteSalary
} = require("../controllers/salary");

const requireLogin = require("../config/auth");
const router = express.Router();

router.get("/salary", requireLogin, getSalary);
router.post("/salary/:role", requireLogin, create);
router.put("/salary/:role/:salaryId", requireLogin, updateSalary);
router.delete("/salary/:role/:salaryId", requireLogin, deleteSalary);

module.exports = router;