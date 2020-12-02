const express = require("express");
const requireLogin = require("../config/auth");
const {
  createAccount,
  accountLogin,
  updateData,
  allUser,
  singleUser,
  deleteUser,
  resignationDate,
  resumptionDate,
  employmentStatus,
  assignSalary,
  uploadPhoto,
  photo,
  timeResumed,
  logout,
  assignPortfolio,
} = require("../controllers/user");
const router = express.Router();
const { upload } = require("../middlware/fileupload");

router.post("/create", createAccount);
router.post("/login", accountLogin);
router.get("/logout", logout);
router.get("/users/:userId/:role", requireLogin, allUser);
router.get("/user/:userId", requireLogin, singleUser);
router.get("/profile/photo/:userId", photo);
router.put("/profile/upload/:userId", upload.single("file"), uploadPhoto);
router.put("/resumption/:userId", timeResumed);
router.put("/user/salary/:userId/:role/:adminId", requireLogin, assignSalary);
router.put("/status/:userId/:role/:adminId", requireLogin, employmentStatus);
router.put("/user/resume/:userId/:role/:adminId", requireLogin, resumptionDate);
router.put("/user/resign/:userId/:role/:adminId", requireLogin, resignationDate);
router.put("/user/portfolio/:portfolioId/:userId/:role/:adminId", requireLogin, assignPortfolio);
router.put("/update/:userId", updateData);
router.delete("/delete/:userId/:role", requireLogin, deleteUser)

module.exports = router;