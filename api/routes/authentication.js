const AuthenticationController = require('../controllers/authentication.controller')
const express = require('express')
const router = express.Router()
const { validationResult, checkSchema } = require('express-validator')

router.post('/register', checkSchema(AuthenticationController.signupValidations), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ message: errors.array().map(err => err.msg).join(' ') })
  }

  await AuthenticationController.create(req, res)
})

router.post('/login', checkSchema(AuthenticationController.loginValidations), async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(401).send({ message: errors.array().map(err => err.msg).join(' ') })
  }

  await AuthenticationController.login(req, res)
})

router.post('/logout', AuthenticationController.logout)

router.get('/user', AuthenticationController.getUser)

module.exports = router
