const express = require("express");
const { upload } = require("../middlware/fileupload");
const {
  accountLogin,
  createCommunityAccount,
  getCommunity,
  updateInfo,
  getAllCommunities,
  deleteCommunity,
  uploadPhoto,
  photo,
} = require("../controllers/community");
const requireLogin = require("../config/auth");
const router = express.Router();

router.post("/community/signup", createCommunityAccount);
router.post("/community/login", accountLogin);
router.get("/community/:communityId", getCommunity);
router.get("/communities", getAllCommunities);
router.get("/community/photo/:communityId", photo);
router.put("/community/update/:communityId", requireLogin, updateInfo);
router.put("/community/photo/upload/:communityId", requireLogin, upload.single("file"), uploadPhoto);
router.delete("/community/:communityId", requireLogin, deleteCommunity);

module.exports = router;