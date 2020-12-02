const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const portfolioSchema = new Schema({
  name: { type: String, required: [ true, "Why is there no portfolio name" ]},
  createdBy: { type: ObjectId, ref: "User", required: [ true, "No creator of this portfolio" ]},
  createdAt: { type: Date, default: Date.now() }
})

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

exports.Portfolio = Portfolio;