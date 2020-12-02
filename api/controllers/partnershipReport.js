const { PartnerReport } = require("../models/partnershipReport");


exports.getReports = (req, res) =>{

  PartnerReport.find({})
    .populate({ createdBy: "firstName lastName phone email" })
    .populate({ categoryId: "name" })
    .populate({ "comments.senderId": "firstName lastName phone email" })
    .populate({ "final_remark.senderId": "firstName lastName phone role" })
    .then(reports => {
      if (!reports || report.length === 0) return res.status(400).json({ error: "Report list is empty" });
      res.json(reports)
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}


exports.getReport = (req, res) =>{
  const { reportId } = req.params;
  if (!reportId) return res.status(400).json({ error: "Invalid parameter values" });

  PartnerReport.findById({ _id: reportId})
    .populate({ createdBy: "firstName lastName phone email" })
    .populate({ categoryId: "name" })
    .populate({ "comments.senderId": "firstName lastName phone email" })
    .populate({ "final_remark.senderId": "firstName lastName phone role" })
    .then(report => {
      if (!report || report.length === 0) return res.status(400).json({ error: "Report list is empty" });
      res.json(report)
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.create = (req, res) => {
  const { role } = req.params;
  const {
    parter_name,
    categoryId,
    response,
    contact_name,
    contact_mobile,
    contact_email
  } = req.body;

  if (!role) return res.status(400).json({ error: " Invalid parameter value" });
  if (role !== "sales_associate") return res.status(400).json({ error: "Only sales associate can perform this operation" });
  if (!parter_name) return res.status(400).json({ error: "What is the partner's name?" });
  if (!categoryId) return res.status(400).json({ error: "What category is this partner?" });
  if (!response) return res.status(400).json({ error: "What is the partner's response?" });
  if (!contact_name) return res.status(400).json({ error: "What is the name person you interacted with?"});
  if (!contact_mobile) return res.status(400).json({ error: "What is the phone number of the person you meet with?" });
  // if (!contact_email) return res.status(400).json({ error: "What is the person's emai"})

  let newReport = new PartnerReport({
    parter_name,
    categoryId,
    response,
    contact_name,
    contact_mobile,
    contact_email
  });

  return newReport.save((err, data) => {
    if (err || !data) return res.status(400).json({ error: `Couldn't create report. ${err.message}`});
    res.json({ message: "New report created", data });
  });
}

/**
 * superior comment
 */
exports.superiouComment = (req, res) => {
  const { reportId, superiorId, role } = req.params;
  const { comment } = req.body;

  if (!reportId || !superiorId || !role) return res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "sales") return res.status(400).json({ error: "Only sale manager can access this operation" });
  if (!comment) return res.status(400).json({ error: "Comment is required" });

  const comment = {
    senderId: superiorId,
    comment,
  }

  PartnerReport.findByIdAndUpdate({ _id: reportId}, { $push: { comments: comment}}, {new: true})
    .then(report => {
      if (!report) return res.status(400).json({ error: "Failed to update. Report not found"});
      res.json({message: "Comment added successfully", report});
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

/**
 * Sales associate response to superior comment
 */
exports.comment = (req, res) => {
  const { reportId, associateId, role } = req.params;
  const { comment } = req.body;

  if (!reportId || !associateId || !role) return res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "sales_associate") return res.status(400).json({ error: "Only sale associate can access this operation" });
  if (!comment) return res.status(400).json({ error: "Comment is required" });

  const comment = {
    senderId: associateId,
    comment,
  }

  PartnerReport.findByIdAndUpdate({ _id: reportId}, { $push: { comments: comment}}, {new: true})
    .then(report => {
      if (!report) return res.status(400).json({ error: "Failed to update. Report not found"});
      res.json({message: "Comment added successfully", report});
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

/**
 * Super admin comment on the day's sales
 */
exports.generalComment = (req, res) => {
  const { reportId, adminId, role } = req.params;
  const { comment } = req.body;

  if (!reportId || !adminId || !role) return res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "super_admin") return res.status(400).json({ error: "Only super admin can access this operation" });
  if (!comment) return res.status(400).json({ error: "Comment is required" });

  PartnerReport.findByIdAndUpdate({ _id: reportId}, { $set: { "final_remark.senderId": adminId, "finaal_remark.comment": comment }}, {new: true})
    .then(report => {
      if (!report) return res.status(400).json({ error: "Failed to update. Report not found"});
      res.json({message: "Comment added successfully", report});
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

/**
 * Super admin approval of sale
 */
exports.approveSale = (req, res) => {
  const { reportId, role} = req.params;

  if (!reportId ||!role) return res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "super_admin") return res.status(400).json({ error: "Unauthorized access. Permission denied" });
  PartnerReport.findByIdAndUpdate({ _id: reportId}, { $set: { approved: true }}, { new: true })
    .then(report => {
      if (!report) return res.status(400).json({ error: "Failed to approve report. Report not found" });
      return res.json({ message: "Report is successfully approved" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

/**
 * 
 */
exports.superSeen = (req, res) => {
  const { reportId, role} = req.params;

  if (!reportId || !role)  return res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "super_admin") return res.status(400).json({ error: "Only super admin is authorized for this operation" });

  PartnerReport.findByIdAndUpdate({ _id: reportId}, { $set: { sup_seen: true }}, { new: true })
    .then(report => {
      if (!report) return res.status(400).json({ error: `No report found with the id ${req.params.reportId}`});
      res.json({ message: "Success" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

/**
 * 
 */
exports.adminSeen = (req, res) => {
  const { reportId, role} = req.params;

  if (!reportId || !role)  return res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "super_admin") return res.status(400).json({ error: "Only super admin is authorized for this operation" });

  PartnerReport.findByIdAndUpdate({ _id: reportId}, { $set: { admin_seen: true }}, { new: true })
    .then(report => {
      if (!report) return res.status(400).json({ error: `No report found with the id ${req.params.reportId}`});
      res.json({ message: "Success" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}