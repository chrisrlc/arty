const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt');

// Create and save a new User
async function create (req, res) {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email or password can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 12) // Encrypt password
  };

  // Save User in the database
  try {
    req.session.user = await User.create(user)
    console.log('In register')
    console.log(session.id)
    res.send(req.session.user);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
}

async function comparePasswords (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

async function login (req, res) {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email or password can not be empty!"
    });
    return;
  }

  const email = req.body.email;
  const plainPassword = req.body.password;

  // Save User in the database
  try {
    const user = await User.findOne({where: {email: email}})
    if (user && await comparePasswords(plainPassword, user.password)) {
      req.session.user = user
      console.log(req.session)
      console.log(req.session.id)
      return res.send(user)
    } else {
      return res.status(403).send({
        message:
          "User login credentials invalid."
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while logging in."
    });
  }
}

function getUser (req, res) {
  console.log('in getUser')
  // console.log(session.user.email)
  console.log(req.session)
  console.log(req.session.id)
  res.send(req.session.user);
}

module.exports = {
  create,
  login,
  getUser
}
