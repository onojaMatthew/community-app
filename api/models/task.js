const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const taskSchema = new Schema({
  description: { type: String, required: true },
  supervisedBy: { type: ObjectId, ref: "User", required: true },
  deadline: { type: Date, required: true },
  assignedTo: { type: ObjectId, ref: "User", required: true },
  status: { type: String, enum: [ "complete", "pending" ], default: "pending" },
  assignedBy: { type: ObjectId, ref: "User", required: true },
  assignedDate: { type: Date, default: Date.now() }
});

const Task = mongoose.model("Task", taskSchema);

exports.Task = Task;