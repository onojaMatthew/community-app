const { Query } = require("../models/query");
const { User } = require("../models/user");

exports.issueQuery = (req, res) => {
  const { adminId, role } = req.params;
  const { _id } = req.user;
  const { receiverId, queryStatement } = req.body;
  if (!adminId) return res.status(400).json({ error: "Invalid request parameters provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });
  if (!role || role !== "admin" && role !== "super_admin") return res.status(400).json({ error: "Only super admin and admin can access this operation" });
  if (!receiverId) return res.status(400).json({ error: "Who is receiving the the query" });
  if (!queryStatement) return res.status(400).json({ error: "Why are you issuing this query?" });
  
  let issueDate = new Date();
  let query = new Query({
    issuerId: adminId,
    receiverId,
    issuedDate: issueDate,
    queryStatement
  });

  query.save()
    .then(query => {
      if (!query) return res.status(400).json({ error: "Failed to issue query. Try again" });
      res.json(query);
      return exports.queryCount(req, res, receiverId);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.queryCount = (req, res, userId) => {
  User.findByIdAndUpdate({ _id: userId }, { $inc: { queryCount: +1 }}, { new: true })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Failed to update query count" });
      res.json("Updated successfully");
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getQuery = (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: "Invalid parameter values" });
  Query.find({ receiverId: userId })
    .populate("receiverId", "firstName lastName portfolio")
    .populate("issuerId", "firstName lastName portfolio")
    .then(query => {
      if (!query) return res.status(400).json({ error: "No query found for this staff" });
      res.json(query);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getAllQuery = (req, res) => {
  const { adminId, role } = req.params;
  const { _id } = req.user;
  if (!role || role !== "admin") return res.status(400).json({ error: "Only admin view this information" });
  if (!adminId) return res.status(400).json({ error: "Invalid request parameters provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });

  Query.find({})
    .sort({ issuedDate: 1 })
    .populate("receiverId", "firstName lastName portfolio")
    .populate("issuerId", "firstName lastName portfolio")
    .then(query => {
      if (!query) return res.status(400).json({ error: "Query list is empty" });
      return res.json(query);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.queryResponse = (req, res) => {
  const { staffId } = req.params;
  const { queryResponse, queryId } = req.body;
  const { _id } = req.user;
  if (!queryId) return res.status(400).json({ error: "Unknown query ID" });
  if (!staffId) return res.status(400).json({ error: "Unknown staff ID" });
  if (!queryResponse) return res.status(400).json({ error: "What is the query response" });
  if (staffId !== _id) return res.status(400).json({ error: "Unknown user access" });

  Query.findByIdAndUpdate({ _id: queryId}, { $set: { queryResponse, respondDate: new Date() }}, { new: true})
    .then(query => {
      if (!query) return res.status(400).json({ error: "Operation failed. Try again" });
      return res.json(query);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });

}

exports.deleteQuery = (req, res) => {
  const { queryId, adminId, role } = req.params;
  const { _id } = req.user;
  if (!role || role !== "admin") return res.status(400).json({ error: "Only admin view this information" });
  if (!adminId) return res.status(400).json({ error: "Invalid request parameters provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });

  Query.findByIdAndDelete({ _id: queryId })
    .then(query => {
      if (!query) return res.status(400).json({ error: "Query not found" });
      return res.json({message: "Query deleted successfully"});
    });
}