const ArtworkController = require('../controllers/artwork.controller')
const express = require('express')
const router = express.Router()

router.post('/art', async (req, res) => {
  await ArtworkController.create(req, res)
})

router.get('/art/:artworkId', async (req, res) => {
  await ArtworkController.show(req, res)
})

module.exports = router
