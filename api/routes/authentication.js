const AuthenticationController = require('../controllers/authentication.controller')
const express = require('express')
const router = express.Router()

router.post('/auth/register', async (req, res) => {
  await AuthenticationController.create(req, res)
})

router.post('/auth/login', async (req, res) => {
  await AuthenticationController.login(req, res)
})

router.post('/auth/logout', async (req, res) => {
  await AuthenticationController.logout(req, res)
})

router.get('/auth/user', (req, res) => {
  AuthenticationController.getUser(req, res)
})

module.exports = router
