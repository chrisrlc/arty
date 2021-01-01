const db = require('../models')
const Work = db.works
const Artist = db.artists
const cloudinary = require('../lib/cloudinary.js')

// Create and save a new Work
async function create (req, res) {
  // TODO: 403 if no user

  try {
    let artistId = null
    if (req.body.artist) {
      const artist = await Artist.findOrCreate({
        where: { name: req.body.artist }
      })
      artistId = artist.id
    }

    const work = Work.build({
      userId: req.session.user.id,
      artistId: artistId,
      title: req.body.title,
      description: req.body.description,
      acquisitionUrl: req.body.acquisitionUrl,
      acquisitionDate: req.body.acquisitionDate,
      acquisitionCost: req.body.acquisitionCost
    })

    if (req.body.image) {
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploadImage(req.body.image)

      // Set up image data for db
      work.cloudinaryId = imageUpload.public_id
      work.imageUrl = imageUpload.secure_url
    }

    // Create Work in db
    await work.save()

    res.send({ id: work.id })
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating a Work.'
    })
  }
}

// Edit an existing Work
async function edit (req, res) {
  // TODO: 403 if no user

  const work = await Work.findByPk(req.params.workId)
  if (work) {
    try {
      let artistId = null
      if (req.body.artist) {
        const artist = await Artist.findOrCreate({
          where: { name: req.body.artist }
        })
        artistId = artist.id
      }

      work.artistId = artistId
      work.title = req.body.title
      work.acquisitionUrl = req.body.acquisitionUrl
      work.acquisitionDate = req.body.acquisitionDate
      work.acquisitionCost = req.body.acquisitionCost

      if (req.body.imageUpdated) {
        if (work.cloudinaryId) {
          // Delete old image from Cloudinary
          await cloudinary.deleteImage(work.cloudinaryId)
        }

        if (req.body.image) {
          // Upload new image to Cloudinary
          const imageUpload = await cloudinary.uploadImage(req.body.image)

          // Update image data on db record
          work.cloudinaryId = imageUpload.public_id
          work.imageUrl = imageUpload.secure_url
        } else {
          // Delete image data from db record
          work.cloudinaryId = null
          work.imageUrl = null
        }
      }

      // Save updated record in db
      await work.save()

      res.end()
    } catch (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while editing a Work.'
      })
    }
  } else {
    res.status(404).send({
      message: 'No Work found.'
    })
  }
}

async function show (req, res) {
  // TODO: 403 if no user

  const work = await Work.findByPk(req.params.workId)
  if (work) {
    let artistName = null
    if (work.artistId) {
      const artist = await Artist.findByPk(work.artistId)
      artistName = artist.name
    }
    res.send({
      id: work.id,
      title: work.title,
      artist: artistName,
      description: work.description,
      acquisitionUrl: work.acquisitionUrl,
      acquisitionDate: work.acquisitionDate,
      acquisitionCost: work.acquisitionCost,
      image: work.imageUrl
    })
  } else {
    res.status(404).send({
      message: 'No Work found.'
    })
  }
}

module.exports = {
  create,
  edit,
  show
}
