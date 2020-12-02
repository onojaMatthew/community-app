const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  address: {
    state: String,
    city: String,
    street: String
  },
  resumeTime: [{
    hour: { type: Number },
    min: { type: Number },
    sec: { type: Number },
    day: { type: Number },
    month: { type: Number }
  }],
  sex: { type: String, enum: [ "male", "female"], default: "male" },
  dob: { type: Date },
  role: { type: String, enum: [
    "super_admin", 
    "admin", "support", 
    "support_associate", 
    "employee", "sales", 
    "sales_associate",
    "software_engineer"
  ] },
  dateResumed: { type: Date },
  dateResigned: { type: Date },
  status: { 
    type: String, enum: [ "active", "sacked", "resigned", "suspended", "died", "hospitalize", "on leave" ], default: "active" 
  },
  imageUrl: { data: Buffer, ContentType: String },
  reset_password_token: { type: String },
  reset_password_expire: { type: Date },
  queryCount: { type: Number, default: 0 },
  email: { type: String, required: [true, "Your email was not provided"]},
  password: { type: String, required: [ true, "Your password was not provided"]},
  salaryId: { type: ObjectId, ref: "Salary" },
  portfolio: { 
    type: ObjectId, 
    ref: "Portfolio"
  },
  nextOfKin: { type: String },
  nextOfKinRel: { type: String },
  nextOfKinAddr: { type: String },
  nextOfKinPhone: { type: String },
  guarantorFName: { type: String },
  guarantorLName: { type: String },
  guarantorAddr: { type: String },
  guarantorOccupation: { type: String },
  guarantorPhone: { type: String },
  createdAt: { type: Date, default: Date().now }
}, {
  timestamps: true
})

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id, email: this.email, role: this.role }, process.env.SECRETKEY);
  return token;
}

const User = mongoose.model("User", userSchema);

exports.User = User;
