const express = require("express");
const requireLogin = require("../config/auth");
const {
  issueQuery,
  queryResponse,
  getAllQuery,
  deleteQuery,
  getQuery,
} = require("../controllers/query");

const router = express.Router();

router.post("/query/:adminId/:role", requireLogin, issueQuery);
router.get("/query/:adminId/:role", requireLogin, getAllQuery);
router.put("/query/:staffId", requireLogin, queryResponse);
router.get("/query/:userId", requireLogin, getQuery);
router.delete("/query/:queryId/:adminId/:role", requireLogin, deleteQuery);
// router.put("/query/: sol", requireLogin, "useful");

module.exports = router;