const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const querySchema = new Schema({
  issuerId: { type: ObjectId, ref: "User", required: true },
  receiverId: { type: ObjectId, ref: "User", required: true },
  queryStatement: { type: String, required: true },
  queryResponse: { type: String },
  issuedDate: { type: Date, default: Date().now },
  respondDate: { type: Date }
});

const Query = mongoose.model("Query", querySchema);

exports.Query = Query;