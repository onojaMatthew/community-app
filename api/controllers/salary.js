const { Salary } = require("../models/salary");

exports.create = (req, res) => {
  const { portfolio, amount } = req.body; 
  const { role } = req.params;
  const createdBy = req.user._id;
  if (!role) return res.status(400).json({ error: "Invalid parameter value" });
  if (role !== "super_admin" ) return res.status(400).json({ error: "Unauthorized access" });
  if (!portfolio || !amount) return res.status(400).json({ error: "Portfolio and amount are required" });
  if (!portfolio) return res.status(400).json({ error: "Portfolio is required" });
  if (!amount) return res.status(400).json({ error: "Amount is not provided" });

  let salary = new Salary({ 
    portfolio,
    amount,
    createdBy
  })
  return salary.save()
    .then(sal => {
      if (!sal) return res.status(400).json({ error: "Failed to create new salary" });
      res.json(sal);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getSalary = (req, res) => {
  Salary.find({})
    .populate("createdBy", "firstName lastName _id")
    .then(salary => {
      if (!salary) return res.status(400).json({ error: "Salary record is empty" });
      res.json(salary);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteSalary = (req, res) => {
  const { role, salaryId } = req.params;
  if (!role) res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "super_admin") return res.status(400).json({ error: "You're not authorized to access this information" });
  if (!salaryId) return res.status(400).json({ error: "Salary Id must be provided to continue this operation" });
  Salary.findByIdAndDelete({ _id: salaryId })
    .then(sal => {
      if (!sal) return res.status(400).json({ error: "Failed to delete Salary from the collection" });
      res.json({ message: "Successfully deleted" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.updateSalary = (req, res) => {
  const { role, salaryId } = req.params;
  const { amount } = req.body;
  if (!role || !salaryId) return res.status(400).json({ error: "Invalid parameter values" });
  if (role !== "super_admin") return res.status(400).json({ error: "Only super admin can access this operation" });
  if (!amount) return res.status(400).json({ error: "Amount must be provided for this operation" });
  Salary.findByIdAndUpdate({ _id: salaryId }, { $set: { amount: amount }}, { new: true })
    .then(sal => {
      if (!sal) return res.status(400).json({ error: "The salary you want to update does not exist" });
      res.json(sal);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}