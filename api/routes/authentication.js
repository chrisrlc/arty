const AuthenticationController = require('../controllers/authentication.controller')
const express = require('express')
const router = express.Router()

router.post('/register', AuthenticationController.validateSignup, AuthenticationController.create)

router.post('/login', AuthenticationController.validateLogin, AuthenticationController.login)

router.post('/logout', AuthenticationController.logout)

router.get('/user', AuthenticationController.getUser)

module.exports = router
