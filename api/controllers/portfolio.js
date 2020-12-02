const { Portfolio } = require("../models/portfolio");

//=============================================================================
// Creates a new portfolio
exports.createPortfolio = (req, res) => {
  const {adminId, role } = req.params;
  const { _id } = req.user;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Portfolio must have a name" });
  if (!adminId) return res.status(400).json({ error: "Invalid params provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });
  if (!role || role !== "admin" && role !== "super_admin") return res.status(400).json({ error: "Only super admin and admin can access this operation" });
  Portfolio.findOne({ name })
    .then(portfolio => {
      if (portfolio) return res.status(400).json({ error: "Portfolio already exists" });
      let portfo = new Portfolio({ name, createdBy: adminId });
      portfo.save();
      res.json(portfo);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

// ================================================================================
// Gets all portfolio 
exports.getAllPortfolio = (req, res) => {
  const {adminId, role } = req.params;
  const { _id } = req.user;
  if (!adminId) return res.status(400).json({ error: "Invalid params provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });
  if (!role || role !== "admin" && role !== "super_admin") return res.status(400).json({ error: "Only super admin and admins can access this operation" });
  Portfolio.find({})
    .sort({ name: 1 })
    .populate("createdBy", "firstName lastName email _id role portfolio")
    .then(portfolio => {
      if (!portfolio) return res.status(400).json({ error: "Portfolio list is empty" });
      return res.json(portfolio);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

//==================================================================================
//Updates a portfolio
exports.update = (req, res) => {
  const {adminId, role } = req.params;
  const { _id } = req.user;
  const { name, portfolioId } = req.body;
  if (!portfolioId) return res.status(400).json({ error: "Invalid request" });
  if (!name) return res.status(400).json({ error: "You provide a new name for this portfolio" });
  if (!adminId) return res.status(400).json({ error: "Invalid params provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });
  if (!role || role !== "admin") return res.status(400).json({ error: "Only admin can access this operation" });
  Portfolio.findByIdAndUpdate({ _id: portfolioId}, { $set: { name: name }}, { new: true })
    .then(port => {
      if (!port) return res.status(400).json({ error: `No portfolio found for this portfolio ID ${portfolioId}`});
      return res.json({ message: "Updated successfully" });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

//=====================================================================================
// Delete a portfolio with the provided ID
exports.deletePortfolio = (req, res) => {
  const { portfolioId, adminId, role } = req.params;
  const { _id } = req.user;
  if (!adminId || !portfolioId) return res.status(400).json({ error: "Invalid request parameters provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });
  if (!role || role !== "admin" && role !== "super_admin") return res.status(400).json({ error: "Only super admin and admins can access this operation" });
  Portfolio.findByIdAndDelete({ _id: portfolioId})
    .then(portfolio => {
      if (!portfolio) return res.status(400).json({ error: "Portfolio not found. Update failed" });
      return res.json( { message: "Portfolio deleted successfully" });
    })
    .catch(er => {
      res.status(400).json({ error: err.message });
    });
}

