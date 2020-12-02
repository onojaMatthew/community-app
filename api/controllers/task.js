const { Task } = require("../models/task");

exports.createTask = (req, res) => {
  const { userId } = req.params;
  const { description, deadline, assignedTo, supervisedBy } = req.body;
  if (!userId) return res.status(400).json({ error: "Unauthorized access" });
  if (!description) return res.status(400).json({ error: "Task description is required" });
  if (!deadline) return res.status(400).json({ error: "Task completion date is required" });
  
  let task = new Task({ 
    description, 
    deadline, 
    createdBy: userId,
    assignedTo,
    assignedBy: req.user._id,
    supervisedBy,
  });
  return task.save()
    .then(task => {
      if (!task) return res.status(400).json({ error: "Failed to create task. Please try again" });
      res.json({ message: "Task created successfully" });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.assignTask = (req, res) => {
  const { userId, executorId, taskId } = req.params;
  const {deadline } = req.body;
  const { _id } = req.user;
  if (!userId) return res.status(400).json({ error: "Unknown user, Please login properly" });
  if (userId !== _id) return res.status({ error: "Unauthorized access"});
  if (!taskId) return res.status(400).json({ error: "You need to specify the task to want to assign" });
  if (!executorId) return res.status(400).json({ error: "Who are you assigning this task to" });
  const assignedDate = new Date.now();
  Task.findByIdAndUpdate({ _id: taskId }, { $set: { executorId, deadline, assignedDate, status: "pending" }}, { new: true })
    .then(task => {
      if (!task) return res.status(400).json({ error: "Failed to assigned task. Please try again" });
      return res.json({ message: "Success" });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.assignSupervisor = (req, res) => {
  const { supervisorId, taskId, adminId } = req.params;
  if (!adminId) return res.status(400).json({ error: "Unknown admin access" });
  if (!taskId) return res.status(400).json({ error: "You need to select a task for supervision" });
  if (!supervisorId) return res.status(400).json({ error: "Supervisor is required for this operation" });

  Task.findByIdAndUpdate({ _id: taskId }, { $set: { supervisorId }}, { new: true })
    .then(task => {
      if (!task) return res.status(400).json({ error: "Failed to assign supervisor to this task. Try again" });
      return res.json({ message: "Success" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getTask = (req, res) => {
  Task.find({})
    .populate("assignedTo", "firstName lastName")
    .populate("assignedBy", "firstName lastName ")
    .populate("supervisedBy", "firstName lastName ")
    .then(tasks => {
      if (!tasks) return res.status(400).json({ error: "Tasks list record is empty" });
      res.json(tasks);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.completeTask = (req, res) => {
  const { taskId, executorId } = req.params;
  if (!taskId) return res.status(400).json({ error: "You need to select a task for supervision" });
  if (!executorId) return res.status(400).json({ error: "Supervisor is required for this operation" });

  Task.findByIdAndUpdate({ _id: taskId })
    .then(task => {
      if (!task) return res.status(400).json({ error: "Failed to assign supervisor to this task. Try again" });
      if (task.executorId !== executorId) return res.status(400).json({ error: "You are not the one handling this task" });
      
      task.status = "complete";
      return res.json({ message: "Success" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteTask = (req, res) => {
  const { taskId, adminId } = req.params;
  if (!admin && !taskId) return res.status(400).json({ error: "Invalid request parameters" });
  if (!adminId) return res.status(400).json({ error: "Unauthorized user access" });
  if (!taskId) return res.status(400).json({ error: "Which task do you want to delete"});

  Task.findByIdAndDelete({ _id: taskId })
    .then(task => {
      if (!task) return res.status(400).json({ error: "Failed to delete task. Try again" });
      return res.json(task);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}


