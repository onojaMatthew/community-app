const error = require("../config/error");
const userRoutes = require("../api/user");
const portfolioRoutes = require("../api/portfolio");
const queryRoutes = require("../api/query");
const authRoutes = require("../api/auth");
const categoryRoutes = require("../api/category");
const salaryRoutes = require("../api/salary");
const taskRoutes = require("../api/task");
const roomRoutes = require("../api/chatRoom");
const communityRoutes = require("../api/community");
const topicRoutes = require("../api/topic");
const chatRoutes = require("../api/chat");
const chatCategoryRoutes = require("../api/chatCategory");

module.exports = (app) => {
  app.use("/v1", userRoutes);
  app.use("/v1", portfolioRoutes);
  app.use("/v1", queryRoutes);
  app.use("/v1", authRoutes);
  app.use("/v1", categoryRoutes);
  app.use("/v1", salaryRoutes);
  app.use("/v1", taskRoutes);
  app.use("/v1", roomRoutes);
  app.use("/v1", communityRoutes);
  app.use("/v1", topicRoutes);
  app.use("/v1", chatRoutes);
  app.use("/v1", chatCategoryRoutes);
  app.use(error);
}

