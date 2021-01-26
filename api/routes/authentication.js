const AuthenticationController = require('../controllers/authentication.controller')
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const validations = [
  body('email').isEmail().withMessage('Please enter a valid email address.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
]

const signupValidations = validations.concat([
  body('email').custom(AuthenticationController.validateSignupEmail),
  body('agreeToTerms').isBoolean().isIn([true])
    .withMessage('Please agree to the terms and conditions before creating an account.')
])

router.post('/register', signupValidations, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ message: errors.array().map(err => err.msg).join(' ') })
  }

  await AuthenticationController.create(req, res)
})

router.post('/login', validations, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array().map(err => err.msg).join(' ') })
  }

  await AuthenticationController.login(req, res)
})

router.post('/logout', AuthenticationController.logout)

router.get('/user', AuthenticationController.getUser)

module.exports = router
