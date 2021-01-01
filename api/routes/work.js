const WorkController = require('../controllers/work.controller')
const express = require('express')
const router = express.Router()

router.post('/art/new', async (req, res) => {
  await WorkController.create(req, res)
})

router.post('/art/:workId', async (req, res) => {
  await WorkController.edit(req, res)
})

router.get('/art/:workId', async (req, res) => {
  await WorkController.show(req, res)
})

module.exports = router
