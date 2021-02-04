const WorkController = require('../controllers/work.controller')
const express = require('express')
const router = express.Router()

router.get('/', WorkController.validateUser, WorkController.index)

router.post('/', WorkController.validateUser, WorkController.validateWork, WorkController.create)

router.post('/:workId', WorkController.validateAuthorizedUser, WorkController.validateWork, WorkController.update)

router.get('/:workId', WorkController.validateAuthorizedUser, WorkController.show)

router.delete('/:workId', WorkController.validateAuthorizedUser, WorkController.destroy)

module.exports = router
