const db = require('../models')
const Artwork = db.artworks
const Artist = db.artists
const ArtistWebsite = db.artistWebsites

// Create and save a new User
async function create (req, res) {
  // TODO: 403 if no user

  const newArtist = Artist.create({ name: req.body.artist })

  req.body.websites.forEach(function (websiteUrl) {
    ArtistWebsite.create({ url: websiteUrl })
  })

  const newArtwork = {
    userId: req.session.user.id,
    artistId: newArtist.id,
    title: req.body.title,
    description: req.body.description,
    acquisitionUrl: req.body.acquisitionUrl,
    acquisitionDate: req.body.acquisitionDate,
    acquisitionCost: req.body.acquisitionCost
  }
  Artwork.create(newArtwork)
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
