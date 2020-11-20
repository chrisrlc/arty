const AuthenticationController = require("../controllers/authentication.controller");
const express = require('express');
const router = express.Router();

router.post('/api/auth/register', async (req, res) => {
  try {
    await AuthenticationController.create(req, res);
    res.send({message: 'An account has been created'})
  } catch (err) {
    throw err;
  }
})

router.post('/api/auth/login', async (req, res) => {
  try {
    await AuthenticationController.login(req, res);
    res.send({ message: 'Login is successful' });
  } catch (err) {
    throw err;
  }
})

router.get('/api/auth/user', async (req, res) => {
  res.send({ ok: 'ok' })
})

module.exports = router;
