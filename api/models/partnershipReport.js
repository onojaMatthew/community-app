const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const partnerreportSchema = new Schema({
  parter_name: { type: String, required: true },
  categoryId: { type: ObjectId, ref: "Category", required: true},
  response: { type: String, required: true },
  constact_name: { type: String, required: true },
  contact_mobile: { type: String, required: true },
  contact_email: { type: String },
  comments: [{
    senderId: { type: ObjectId, ref: "User" },
    comment: { type: String }
  }],
  sup_seen: { type: Boolean, default: false },
  admin_seen: { type: Boolean, default: false },
  final_remark: {
    senderId:{ type: ObjectId, ref: "User" },
    comment: { type: String },
    commentedAt: { type: Date, default: Date.now() }
  },
  approved: { type: Boolean, default: false },
  createdBy: { type: ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now() }
});

const PartnerReport = mongoose.model("PartnerReport", partnerreportSchema);

exports.PartnerReport = PartnerReport;