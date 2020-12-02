const express = require("express");
const { resetPassword } = require("../controllers/auth");

const router = express.Router();

router.post("/reset", resetPassword);

module.exports = router;