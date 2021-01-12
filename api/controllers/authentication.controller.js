const db = require('../models')
const User = db.users
const bcrypt = require('bcrypt')
const helper = require('../helpers/application.js')

// Create and save a new User
async function create (req, res) {
  const email = helper.sanitize(req.body.email)
  const plainPassword = helper.sanitize(req.body.password)
  const agreeToTerms = req.body.agreeToTerms

  // Validate request
  if (!agreeToTerms) {
    res.status(401).send({
      message: 'Please agree to the terms and conditions before creating an account.'
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
      message: 'Email has already been taken. Please log in or choose another.'
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
    res.end()
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the user.'
    })
  }
}

async function comparePasswords (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

async function login (req, res) {
  const email = helper.sanitize(req.body.email)
  const plainPassword = helper.sanitize(req.body.password)

  // Validate request
  if (!email || !plainPassword) {
    res.status(401).send({
      message: "Email or password can't be empty!"
    })
    return
  }
  if (plainPassword.length < 6) {
    res.status(401).send({
      message: "Password must be at least 6 characters."
    })
    return
  }

  // Find User in the database and set session
  try {
    const user = await User.findOne({where: {email: email}})
    if (user && await comparePasswords(plainPassword, user.password)) {
      req.session.user = user
      res.end()
    } else {
      res.status(403).send({
        message:
          'Invalid email or password.'
      })
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while logging in.'
    })
  }
}

async function logout (req, res) {
  await req.session.destroy()
  res.redirect('/')
}

function getUser (req, res) {
  if (req.session.user) {
    const { password, ...withoutPassword } = req.session.user
    res.send(withoutPassword)
  } else {
    res.end()
  }
}

module.exports = {
  create,
  login,
  logout,
  getUser
}
