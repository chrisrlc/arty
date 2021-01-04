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
      const [artist, created] = await Artist.findOrCreate({
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
      work.imageFormat = imageUpload.format
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

  const work = await Work.findOne({
    where: {
      id: req.params.workId,
      userId: req.session.user.id
    }
  })
  if (work) {
    try {
      let artistId = null
      if (req.body.artist) {
        const [artist, created] = await Artist.findOrCreate({
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
          work.imageFormat = imageUpload.format
        } else {
          // Delete image data from db record
          work.cloudinaryId = null
          work.imageFormat = null
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

  const work = await Work.findOne({
    where: {
      id: req.params.workId,
      userId: req.session.user.id
    }
  })
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
      imageUrl: work.cloudinaryId ? cloudinary.imageUrl(work.cloudinaryId, work.imageFormat) : null
    })
  } else {
    res.status(404).send({
      message: 'No Work found.'
    })
  }
}

async function index (req, res) {
  // TODO: 403 if no user

  const works = await Work.findAll({
    where: {
      userId: req.session.user.id
    },
    attributes: ['id', 'title', 'artistId', 'cloudinaryId', 'imageFormat']
  })

  const works_display = await Promise.all(works.map(displayWork))
  res.send(works_display)
}

async function displayWork (work) {
  // Get artist name
  let artistName = null
  if (work.artistId) {
    const artist = await Artist.findByPk(work.artistId)
    artistName = artist.name
  }

  let imageUrl = null
  if (work.cloudinaryId) {
    // Scale image to height=250
    const transformation_opts = {
      height: 250,
      crop: 'fill'
    }
    imageUrl = cloudinary.imageUrl(work.cloudinaryId, work.imageFormat, transformation_opts)
  }

  return {
    id: work.id,
    title: work.title,
    artist: artistName,
    imageUrl: imageUrl
  }
}

module.exports = {
  create,
  edit,
  show,
  index
}
