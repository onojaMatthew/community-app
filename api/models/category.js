const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: [ true, "Why is there no name for this category"] },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: ObjectId, ref: "User", required: true },
  updatedBy: { type: ObjectId, ref: "User" },
  updatedAt: { type: Date },
});

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;