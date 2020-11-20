const express = require('express');
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller");

router.post('/api/auth/register', async (req, res) => {
  await AuthenticationController.create(req, res)
    .then(() => {
      res.send({ message: 'An account has been created!' })
    }).catch((err) => {
      throw err
    })
})

router.post('/api/auth/login', async (req, res) => {
})

router.get('/api/auth/user', async (req, res) => {
  res.send({ ok: 'ok' })
})

module.exports = router;
