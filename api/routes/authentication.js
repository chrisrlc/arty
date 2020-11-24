const AuthenticationController = require("../controllers/authentication.controller")
const express = require('express')
const router = express.Router()

router.post('/api/auth/register', async (req, res) => {
  await AuthenticationController.create(req, res)
})

router.post('/api/auth/login', async (req, res) => {
  await AuthenticationController.login(req, res)
})

router.post('/api/auth/logout', (req, res) => {
  AuthenticationController.logout(req, res)
})

router.get('/api/auth/user', (req, res) => {
  AuthenticationController.getUser(req, res)
})

module.exports = router
