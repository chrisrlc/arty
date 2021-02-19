const db = require('../models')
const User = db.users
const bcrypt = require('bcrypt')
const { check, validationResult, matchedData } = require('express-validator')

// Create and save a new User
async function create (req, res) {
  try {
    // Validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    // Filter req data
    const allowedData = matchedData(req)

    // Create a User
    const newUser = {
      email: allowedData.email,
      password: await bcrypt.hash(allowedData.password, 12) // Encrypt password
    }

    // Save User in the database and log in
    req.session.user = await User.create(newUser)
    res.end()
  } catch (err) {
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
}

async function comparePasswords (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

async function login (req, res) {
  try {
    // Validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).send({ errors: errors.array() })
    }

    // Filter req data
    const allowedData = matchedData(req)

    // Find User in the database and set session
    const user = await User.findOne({where: {email: allowedData.email}})
    if (user && await comparePasswords(allowedData.password, user.password)) {
      req.session.user = user
      res.end()
    } else {
      res.status(403).send({ errors: [{ msg: 'Invalid email or password.' }] })
    }
  } catch (err) {
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
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

// VALIDATIONS

const validateLogin = [
  check('email').trim().isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
  check('password').isLength({min: 6}).withMessage('Password must be at least 6 characters.')
]

const validateSignup = validateLogin.concat([
  check('email').custom(async value => {
    const user = await User.findOne({ where: { email: value } })
    if (user) {
      throw new Error('Email has already been taken. Please log in or choose another.')
    } else {
      return value
    }
  }),
  check('agreeToTerms', 'Please agree to the terms and conditions before creating an account.')
    .isIn([true])
])

module.exports = {
  create,
  login,
  logout,
  getUser,
  validateSignup,
  validateLogin
}
