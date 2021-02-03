const db = require('../models')
const User = db.users
const bcrypt = require('bcrypt')
const validator = require('../lib/validator.js')

// Create and save a new User
async function create (req, res) {
  try {
    // Validations
    await validateSignUp(req)
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ message: validator.validationErrorString(errors) })
    }

    // Create a User
    const newUser = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12) // Encrypt password
    }

    // Save User in the database and log in
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
  try {
    // Validations
    await validateLogin(req)
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).send({ message: validator.validationErrorString(errors) })
    }

    // Find User in the database and set session
    const user = await User.findOne({where: {email: req.body.email}})
    if (user && await comparePasswords(req.body.password, user.password)) {
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

// VALIDATION

async function validateSignUp (req) {
  await validator.check('email')
    .trim().isEmail().withMessage('Please enter a valid email address.').normalizeEmail().bail()
    .custom(async value => {
      const user = await User.findOne({where: {email: value}})
      if (user) {
        throw new Error('Email has already been taken. Please log in or choose another.')
      }
    }).run(req)
  await validator.check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.').run(req)
  await validator.check('agreeToTerms', 'Please agree to the terms and conditions before creating an account.')
    .isIn([true]).run(req)
}

async function validateLogin (req) {
  await validator.check('email')
    .trim().isEmail().withMessage('Please enter a valid email address.').normalizeEmail().run(req)
  await validator.check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.').run(req)
}

module.exports = {
  create,
  login,
  logout,
  getUser
}
