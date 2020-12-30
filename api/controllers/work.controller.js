const db = require('../models')
const Work = db.works
const Artist = db.artists
const cloudinary = require('../lib/cloudinary.js')

// Create and save a new User
async function create (req, res) {
  // TODO: 403 if no user

  try {
    let newArtistId = null
    if (req.body.artist) {
      const newArtist = await Artist.create({ name: req.body.artist })
      newArtistId = newArtist.id
    }

    const newWorkInfo = {
      userId: req.session.user.id,
      artistId: newArtistId,
      title: req.body.title,
      description: req.body.description,
      acquisitionUrl: req.body.acquisitionUrl,
      acquisitionDate: req.body.acquisitionDate,
      acquisitionCost: req.body.acquisitionCost
    }

    if (req.body.image) {
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploadImage(req.body.image)

      // Set up image data for db
      newWorkInfo.cloudinaryId = imageUpload.public_id
      newWorkInfo.imageUrl = imageUpload.secure_url
    }

    // Create Work in db
    const newWork = await Work.create(newWorkInfo)

    res.send(newWork)
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating a Work.'
    })
  }
}

async function show (req, res) {
  // TODO: 403 if no user

  const work = await Work.findByPk(req.params.workId)
  if (work) {
    res.send(work)
  } else {
    res.status(404).send({
      message: "No Work found"
    })
  }
}

module.exports = {
  create,
  show
}
