const WorkController = require('../controllers/work.controller')
const express = require('express')
const router = express.Router()

router.get('/', WorkController.index)

router.post('/', WorkController.create)

router.post('/:workId', WorkController.update)

router.get('/:workId', WorkController.show)

module.exports = router
