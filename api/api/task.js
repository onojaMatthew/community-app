const express = require("express");
const requireLogin = require("../config/auth");
const {
  assignTask,
  assignSupervisor,
  completeTask,
  createTask,
  deleteTask,
  getTask,
} = require("../controllers/task");

const router = express.Router();

router.get("/task", requireLogin, getTask);
router.post("/task/:userId", requireLogin, createTask);
router.put("/task/:userId/:executorId/:taskId", requireLogin, assignTask);
router.put("/task/supervisor/:supervisorId/:taskId/:adminId", requireLogin, assignSupervisor);
router.put("/task/complete/:taskId/:assignedTo", requireLogin, completeTask);
router.delete("/task/delete/:taskId/", requireLogin, deleteTask);
module.exports = router;