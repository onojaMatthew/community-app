const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const fs = require("fs");

//===================================================================================
// User account creation
exports.createAccount = (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required"});
  if (!phone) return res.status(400).json({ error: "Your phone number is required" });
  if (!firstName || !lastName) return res.status(400).json({ error: "Your first and last names are required"});

  User.findOne({email})
    .then(user => {
      if (user) return res.status(400).json({ error: "User already exists"});
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          if (!hashedPassword) return res.status(400).json({ error: "Server error. Try again"});
          const adminRole = req.body.adminRole;
          let newUser = User({
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            otherName: req.body.otherName,
            role: adminRole ? adminRole : "employee"
          });

          newUser.save();
          res.json({ userId: newUser._id, message: "Registration success" });
        })
        .catch(err => {
          res.status(400).json({ error: err.message});
        });
    })
    .catch(err => {
      res.status(400).json({ error: err.message});
    });
}

//=========================================================================
// User account login
exports.accountLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required"});
  User.findOne({ email})
    .then(user => {
      if (!user) return res.status(400).json({ error: `User with the email ${email} does not exist`});
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ error: "Password do not match"});
          const token = user.generateToken();
          const { _id, firstName, lastName, otherName, email, role } = user;
          res.cookie("token", token, { expires: new Date(new Date() + 64800000)})
          res.header("x-auth-token", token).json({token, user: { _id, firstName, lastName, otherName, email, role}});
        })
    })
    .catch(err => {
      res.status(400).json({ error: err.message});
    });
}

exports.timeResumed = (req, res) => {
  const { userId } = req.params;

  User.findById({ _id: userId })
    .then(user => {
      if (!user) return res.status(400).json({ error: "No user found for this ID" });
      const resu = new Date(),
        hour = resu.getHours(),
        min = resu.getMinutes(),
        sec = resu.getSeconds(),
        month = resu.getMonth(),
        day = new Date().getDate();
      
      const time = {
        hour,
        min,
        sec,
        month,
        day,
      }

      User.findByIdAndUpdate({ _id: userId }, { $push: { resumeTime: time }}, { new: true }, (err, data) => {
        if (err || !data) return res.status(400).json({ error: `Failed to take resumption time ${err.message}` });
        return res.json(data);
      });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

/**
 * Gets the profile photo of an agent
 */
exports.photo = ( req, res, next ) => {
  const { userId } = req.params;

  User.findById( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "User not found" } );
      res.set( "Content-Type", user.imageUrl.ContentType );
      res.send( user.imageUrl.data );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } )
}

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Successfully logged out" });
}

/**
 * Uploads profile photos
 */
exports.uploadPhoto = ( req, res ) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: "Invalid parameters" });
  // Assigned the path to a new constant @photo
  User.findByIdAndUpdate( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "Can not find user" } );
      user.imageUrl.data = fs.readFileSync( req.file.path );
      user.imageUrl.ContentType = "image/jpg";
      user.save();
      res.json( user );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}


//==========================================================================
// Fetch all user from the database
exports.allUser = (req, res) => {
  const { role, userId } = req.params;
  const { _id } = req.user;
  if (!userId || !role) return re.status(400).json({ error: "Invalid parameters" });
  if (userId !== _id) return res.status(400).json({ error: "Unknown user access" });
  if (role !== "admin" && role !== "support" && role !== "super_admin") return res.status(400).json({ error: "Only admin and support can view this data" });
  User.find({})
    .sort({ firstName: 1 })
    .populate("portfolio", "name")
    .exec((err, data) => {
      if (err) return res.status(400).json({ error: `Something went wrong. ${err.message}` });
      if (!data) return res.status(400).json({ error: "List empty" });
      res.json(data);
    });
}

exports.singleUser = (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: "Invalid parameter" });
  User.findById({ _id: userId })
    .populate("portfolio", "name")
    .populate("salaryId", "amount")
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found" });
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}


//============================================================================
// Updates user information
exports.updateData = (req, res) => {
  const { userId } = req.params;
  const {
    dob,
    sex,
    city,
    state,
    street,
    nextOfKin,
    nextOfKinRel,
    nextOfKinAddr,
    guarantorFName,
    guarantorLName,
    guarantorAddr,
    guarantorOccupation,
    guarantorPhone,
  } = req.body;

  if (!userId) return res.status(400).json({ error: "Invalid parameter values" });
  if (!dob) return res.status(400).json({ error: "Date of birth is required" });
  if (!sex) return res.status(400).json({ error: "We will like to know your sex" });
  if (!city) return res.status(400).json({ error: "Your city of residence is required" });
  if (!state) return res.status(400).json({ error: "Your state of residence is required" });
  if (!street) return res.status(400).json({ error: "Your street of residence is required" });
  if (!nextOfKin) return res.status(400).json({ error: "Who is your next of kin" });
  if (!nextOfKinRel) return res.status(400).json({ error: "What is your relationship with your next of kin" });
  if (!nextOfKinAddr) return re.status(400).json({ error: "Where does your next of kin lives" });
  if (!guarantorAddr) return res.status(400).json({ error: "Tell us your guarantor's address" });
  if (!guarantorFName) return res.status(400).json({ error: "What is your guarantor's first name" });
  if (!guarantorLName) return res.status(400).json({ error: "What is your guarantor's last name" });
  if (!guarantorOccupation) return res.status(400).json({ error: "Where does your guarantor works" });
  if (!guarantorPhone) return res.status(400).json({ error: "Guarantor's phone number is required" });

  User.findByIdAndUpdate({ _id: userId})
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found" });
      if (req.body.phone) user.phone = req.body.phone;
      if (req.body.dob) user.dob = req.body.dob;
      if (req.body.sex) user.sex = req.body.sex;
      if (req.body.city) user.address.city = req.body.city;
      if (req.body.state) user.address.state = req.body.state;
      if (req.body.street) user.address.street = req.body.street;
      if (req.body.nextOfKin) user.nextOfKin = req.body.nextOfKin;
      if (req.body.nextOfKinRel) user.nextOfKinRel = req.body.nextOfKinRel
      if (req.body.nextOfKinAddr) user.nextOfKinAddr = req.body.nextOfKinAddr;
      if (req.body.nextOfKinPhone) user.nextOfKinPhone = req.body.nextOfKinPhone;
      if (req.body.guarantorFName) user.guarantorFName = req.body.guarantorFName;
      if (req.body.guarantorLName) user.guarantorLName = req.body.guarantorLName;
      if (req.body.guarantorAddr) user.guarantorAddr = req.body.guarantorAddr;
      if (req.body.guarantorOccupation) user.guarantorOccupation = req.body.guarantorOccupation;
      if (req.body.guarantorPhone) user.guarantorPhone = req.body.guarantorPhone;
      user.updatedAt = Date.now()
      user.save();
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

/**
 * Deletes a user with the user ID provided
 */
exports.deleteUser = (req, res) => {
  const { userId, role } = req.params;
  if (!userId || !role) return res.status(400).json({ error: "Invalid parameter" });
  if (role !== "admin" && role !== "super admin") return res.status(400).json({ error: "Only super admin and admin can perform this operation" });

  User.findByIdAndDelete({ _id: userId })
    .then(user => {
      if (!user) return res.status(400).json({ error: `User with the ID ${userId} not found` });
      res.json("message","User deleted successfully");
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

//=========================================================================
// Assign portfolio to employee
exports.assignPortfolio = (req, res) => {
  const { userId, role, adminId, portfolioId } = req.params;
  if (!portfolioId) return res.status(400).json({ error: "Invalid portfolio" });
  if (!userId || !role || !adminId) return res.status(400).json({ error: "Invalid parameter" });
  if (adminId !== req.user._id) return res.status(400).json({ error: "Unauthorized user access" });
  if (role !== "super_admin" && role !== "admin") return res.status(400).json({ error: "Only super admin and admins can perform this operation" });
  User.findByIdAndUpdate({ _id: userId })
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found" });
      user.portfolio = req.params.portfolioId;
      user.save();
      res.json({ message: "Portfolio assigned successfully" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

//=========================================================================
//update employee's employment status
exports.employmentStatus = (req, res) => {
  const { userId, role, adminId } = req.params;
  const { status } = req.body;
  if (!role || !adminId || !userId) return res.status(400).json({ error: "Invalid parameters" });
  if (!status) return res.status(400).json({ error: "Invalid employment status" });
  if (adminId !== req.user._id) return res.status(400).json({ error: "Unauthorized user access" });
  if (role !== "super_admin" && role !== "admin") return res.status(400).json({ error: "Only super admin and admin can perform this operation" });

  User.findByIdAndUpdate({ _id: userId })
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found" });
      user.status = status;
      user.save();
      res.json({ message: "Status changed successfully" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

//==============================================================================
// Updates resumtion date
exports.resumptionDate = (req, res ) => {
  const {adminId, userId, role } = req.params;
  const { _id } = req.user;
  if (!adminId || !userId) return res.status(400).json({ error: "Invalid params provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });
  if (!role || role !== "admin") return res.status(400).json({ error: "Only admin can access this operation" });

  User.findByIdAndUpdate({ _id: userId })
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found" });
      const dateResumed = new Date();
      user.dateResumed = dateResumed;
      user.save();
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

//=========================================================================================
// Updates resignation date of an employee
exports.resignationDate = (req, res ) => {
  const {adminId, userId, role } = req.params;
  const { _id } = req.user;
  if (!adminId || !userId) return res.status(400).json({ error: "Invalid params provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });
  if (!role || role !== "admin") return res.status(400).json({ error: "Only admin can access this operation" });

  User.findByIdAndUpdate({ _id: userId })
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found" });
      const dateResigned = new Date();
      user.dateResigned = dateResigned;
      user.save();
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

//==========================================================================================
// Assign salary to an employee
exports.assignSalary = (req, res) => {
  const {adminId, userId, role } = req.params;
  const { _id } = req.user;
  const { salaryId } = req.body;
  if (!salaryId) return res.status(400).json({ error: "Salary amount is not specified" });
  if (!adminId || !userId) return res.status(400).json({ error: "Invalid params provided" });
  if (adminId !== _id) return res.status(400).json({ error: "Unknown user account holder" });
  if (!role || role !== "super_admin") return res.status(400).json({ error: "Only super admin can access this operation" });
  
  User.findByIdAndUpdate({ _id: userId }, {$set: { salaryId }}, { new: true })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Failed to update employee's salary" });
      res.json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

