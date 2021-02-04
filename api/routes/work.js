const WorkController = require('../controllers/work.controller')
const express = require('express')
const router = express.Router()

router.get('/', WorkController.index)

router.post('/', WorkController.validations, WorkController.create)

router.post('/:workId', WorkController.validations, WorkController.update)

router.get('/:workId', WorkController.show)

router.delete('/:workId', WorkController.destroy)

module.exports = router
