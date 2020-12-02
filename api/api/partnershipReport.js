const express = require("express");
const {
  create,
  comment,
  generalComment,
  superSeen,
  superiouComment,
  adminSeen,
  approveSale
} = require("../controllers/partnershipReport");
const requireLogin = require("../config/auth");

const router = express.Router();



module.exports = router;