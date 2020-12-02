const express = require("express");
const {
  getByCategory,
  newTopic,
  deleteTopic,
  getTopics,
  getTopic,
  unlike,
  like
} = require("../controllers/topic");
const requireLogin = require("../config/auth");

const router = express.Router();

router.post("/topic/new", requireLogin, newTopic);
router.get("/topic/all", getTopics);
router.get("/topic/:topicId", getTopic);
router.get("/topic/category/:categoryId", getByCategory);
router.delete("/topic/delete/:topicId", deleteTopic);
router.put("/topic/like/:topicId/:communityId", requireLogin, like);
router.put("/topic/unlike/:topicId/:communityId", requireLogin, unlike);

module.exports = router;