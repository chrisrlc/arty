const AuthenticationController = require('../controllers/authentication.controller')
const express = require('express')
const router = express.Router()
const { checkSchema } = require('express-validator')

router.post('/register', checkSchema(AuthenticationController.signupValidations), AuthenticationController.create)

router.post('/login', checkSchema(AuthenticationController.loginValidations), AuthenticationController.login)

router.post('/logout', AuthenticationController.logout)

router.get('/user', AuthenticationController.getUser)

module.exports = router
