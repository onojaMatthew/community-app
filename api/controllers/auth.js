const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { sendMail } = require("../utils/emailUtil")

exports.resetPassword = (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(32).toString("hex");

  if (!email) return res.status(400).json({ error: "Enter your email" });

  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ error: `No user with email ${email}`});
      user.reset_password_token = token;
      user.reset_password_expire = Date.now() + 1200000;

      user.save()
        .then(result => {
          res.json(result);
          const message = `You are receiving this because you (or someone else) have requested for the reset of the password for this account. Please click on the following link, or paste this into your browser to complete the process ${process.env.FRONT_END_URL}/reset/${token}`;
          const subject = "Password Reset";
          const fromWho = "Ojirehprime Financial Services Limited";
          return sendMail(email, message, subject, fromWho);
        })
        .catch(err => {
          console.log(err)
          // return res.status(400).json({ error: err.message });
        });
    });
}