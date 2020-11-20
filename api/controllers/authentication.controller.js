const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt')

// Create and save a new User
exports.create = (req, res) => {
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
    password: req.body.password //bcrypt.hash(req.body.password, 12) // Encrypt password
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Find a single User with an email
exports.findOne = (req, res) => {
  const email = req.params.email;

  User.findOne({ where: { email: email } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email
      });
    });
};
