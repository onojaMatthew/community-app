const express = require("express");
const requireLogin = require("../config/auth");
const {
  createPortfolio,
  deletePortfolio,
  update,
  getAllPortfolio
} = require("../controllers/portfolio");

const router = express.Router();

router.post("/portfolio/:adminId/:role", requireLogin, createPortfolio);
router.get("/portfolio/:adminId/:role", requireLogin, getAllPortfolio);
router.put("/portfolio/update/:adminId/:role", requireLogin, update);
router.delete("/portfolio/delete/:portfolioId/:adminId/:role", requireLogin, deletePortfolio);

module.exports = router;