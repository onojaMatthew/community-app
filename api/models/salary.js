const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const salarySchema = new Schema({
  portfolio: { type: String, requird: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: ObjectId, ref: "User", required: true }
});

const Salary = mongoose.model("Salary", salarySchema);

exports.Salary = Salary;