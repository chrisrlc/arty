const db = require('../models')
const Artwork = db.artworks
const Artist = db.artists

// Create and save a new User
async function create (req, res) {
  // TODO: 403 if no user

  try {
    let newArtistId = null
    if (req.body.artist) {
      const newArtist = await Artist.create({ name: req.body.artist })
      newArtistId = newArtist.id
    }

    const newArtwork = await Artwork.create({
      userId: req.session.user.id,
      artistId: newArtistId,
      title: req.body.title,
      description: req.body.description,
      acquisitionUrl: req.body.acquisitionUrl,
      acquisitionDate: req.body.acquisitionDate,
      acquisitionCost: req.body.acquisitionCost
    })

    res.send(newArtwork)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating an artwork.'
    })
  }
}

async function show (req, res) {
  // TODO: 403 if no user

  const artwork = await Artwork.findByPk(req.params.artworkId)
  if (artwork) {
    res.send(artwork)
  } else {
    res.status(404).send({
      message: "No artwork found"
    })
  }
}

module.exports = {
  create,
  show
}
