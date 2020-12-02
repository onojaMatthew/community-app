const bcrypt = require("bcrypt");
const fs = require("fs")
const { Community } = require("../models/community");
const Resize = require("../middlware/Resize");

exports.createCommunityAccount = (req, res) => {
  const { email, password, fullname, phone } = req.body;
  if (!email) return res.status(400).json({ error: "Email field is required" });
  if (!password) return res.status(400).json({ error: "Password field is required" });
  if (!phone) return res.status(400).json({ error: "Your phone number is required" });
  if (!fullname) return res.status(400).json({ error: "Your full name is required" });

  Community.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ error: "User already exists"});
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          if (!hashedPassword) return res.status(400).json({ error: "Server error. Try again"});
          let newAccount = new Community({
            email: req.body.email,
            password: hashedPassword,
            fullname: req.body.fullname,
            phone: req.body.phone,
            address: req.body.address,
          });

          newAccount.save();
          res.json({ message: "Registration success" });
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
// Community account login
exports.accountLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "All input fields are required"});
  Community.findOne({ email})
    .then(account => {
      if (!account) return res.status(400).json({ error: `User with the email ${email} does not exist`});
      return bcrypt.compare(password, account.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ error: "Password do not match"});
          const token = account.generateToken();
          const { _id, fullname, phone, email } = account;
          res.cookie("token", token, { expires: new Date(new Date() + 64800000)})
          res.header("x-auth-token", token).json({token, user: { _id, fullname, phone, email }});
        });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getCommunity = (req, res) => {
  const { communityId } = req.params;
  if (!communityId) return res.status(400).json({ error: "Invalid parameter values" });

  Community.findById({ _id: communityId})
    .then(community => {
      if (!community) return res.status(400).json({ error: "No records found" });
      res.json(community);
    })
    .catch(err => {
      res.status(400).json({ eror: err.message });
    });
}

exports.updateInfo = (req, res) => {
  const { communityId } = req.params;
  if (!communityId) return res.status(400).json({ error: "Invalid parameter values" });
  Community.findByIdAndUpdate({ _id: communityId })
    .then(community => {
      if (!community) return res.status(400).json({ error: "User not found" });
      if (req.body.phone) community.phone = req.body.phone;
      if (req.body.address) community.address = req.body.address;
      community.save();
      res.json(community);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getAllCommunities = (req, res) => {
  Community.find({ category })
    .then(categories => {
      if (!categories) return res.status(400).json({ error: "No records found." });
      res.json(categories);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteCommunity = (req, res) => {
  const { communityId } = req.params;

  if (!communityId) return res.status(400).json({ error: "Invalid parameter values" });
  Community.findByIdAndDelete({ _id: communityId})
    .then(resp => {
      if (!resp) return res.status(400).json({ error: "Failed to delete" });
      res.json({ message: "Successfully deleted" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.photo = ( req, res, next ) => {
  const { communityId } = req.params;

  Community.findById( { _id: communityId } )
    .then( account => {
      if ( !account ) return res.status( 400 ).json( { error: "User not found" } );
      
      res.set( "Content-Type", account.photo.ContentType );
      res.send( account.photo.data );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

/**
 * Uploads profile photos
 */
exports.uploadPhoto = ( req, res ) => {
  const { communityId } = req.params;
  if (!communityId) return res.status(400).json({ error: "Invalid parameters" });
  // Assigned the path to a new constant @photo
  Community.findByIdAndUpdate( { _id: communityId } )
    .then( async (account) => {
      if ( !account ) return res.status( 400 ).json( { error: "Can not find user" } );
      const filePath = new Resize(req.file.path);
      account.photo.data = filePath(req.file.buffer)// fs.readFileSync( req.file.path );
      account.photo.ContentType = "image/jpg";
      await account.save();
      res.json( account );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

