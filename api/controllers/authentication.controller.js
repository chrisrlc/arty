const db = require("../models")
const User = db.users
const bcrypt = require('bcrypt')

// Create and save a new User
async function create (req, res) {
  const email = req.body.email
  const plainPassword = req.body.password
  const agreeToTerms = req.body.agreeToTerms

  // Validate request
  if (!agreeToTerms) {
    res.status(401).send({
      message: "Please agree to the terms and conditions before creating an account."
    })
    return
  }
  if (!email || !plainPassword) {
    res.status(401).send({
      message: "Email or password can't be empty!"
    })
    return
  }
  const existingUser = await User.findOne({where: {email: email}})
  if (existingUser) {
    res.status(401).send({
      message: "Email has already been taken. Please log in or choose another."
    })
    return
  }

  // Create a User
  const newUser = {
    email: email,
    password: await bcrypt.hash(plainPassword, 12) // Encrypt password
  }

  // Save User in the database and log in
  try {
    req.session.user = await User.create(newUser)
    res.send(req.session.user)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the user."
    })
  }
}

async function comparePasswords (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

async function login (req, res) {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(401).send({
      message: "Email or password can't be empty!"
    })
    return
  }

  const email = req.body.email
  const plainPassword = req.body.password

  // Find User in the database and set session
  try {
    const user = await User.findOne({where: {email: email}})
    if (user && await comparePasswords(plainPassword, user.password)) {
      req.session.user = user
      res.send(req.session.user)
    } else {
      res.status(403).send({
        message:
          "Invalid email or password."
      })
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while logging in."
    })
  }
}

function logout (req, res) {
  req.session.destroy()
  res.redirect('/')
}

function getUser (req, res) {
  res.send(req.session.user)
}

module.exports = {
  create,
  login,
  logout,
  getUser
}
