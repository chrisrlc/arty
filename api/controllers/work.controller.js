const db = require('../models')
const Work = db.works
const Artist = db.artists
const cloudinary = require('../lib/cloudinary.js')
const helper = require('../helpers/application.js')

// Create and save a new Work
async function create (req, res) {
  // TODO: 403 if no user

  try {
    let artistId = null
    if (req.body.artist) {
      const [artist, created] = await Artist.findOrCreate({
        where: { name: helper.sanitize(req.body.artist) }
      })
      artistId = artist.id
    }

    const work = Work.build({
      userId: req.session.user.id,
      artistId: artistId,
      title: helper.sanitize(req.body.title),
      description: helper.sanitize(req.body.description),
      acquisitionUrl: helper.sanitize(req.body.acquisitionUrl),
      acquisitionDate: helper.sanitize(req.body.acquisitionDate),
      acquisitionCost: helper.sanitize(req.body.acquisitionCost),
      source: helper.sanitize(req.body.source),
      location: helper.sanitize(req.body.location)
    })

    if (req.body.image) {
      // Upload image as base64 data uri string to Cloudinary
      const imageUpload = await cloudinary.uploadImage(req.body.image)

      // Set up image data for db
      work.imageId = imageUpload.public_id
    }

    // Create Work in db
    await work.save()

    res.end()
  } catch (err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating a Work.'
    })
  }
}

// Edit an existing Work
async function update (req, res) {
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
          where: { name: helper.sanitize(req.body.artist) }
        })
        artistId = artist.id
      }

      work.artistId = artistId
      work.title = helper.sanitize(req.body.title)
      work.description = helper.sanitize(req.body.description)
      work.acquisitionUrl = helper.sanitize(req.body.acquisitionUrl)
      work.acquisitionDate = helper.sanitize(req.body.acquisitionDate)
      work.acquisitionCost = helper.sanitize(req.body.acquisitionCost)
      work.source = helper.sanitize(req.body.source)
      work.location = helper.sanitize(req.body.location)

      if (req.body.imageUpdated) {
        if (work.imageId) {
          // Delete old image from Cloudinary
          await cloudinary.deleteImage(work.imageId)
        }

        if (req.body.image) {
          // Upload new image as base64 data uri string to Cloudinary
          const imageUpload = await cloudinary.uploadImage(req.body.image)

          // Update image data on db record
          work.imageId = imageUpload.public_id
        } else {
          // Delete image data from db record
          work.imageId = null
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

async function destroy (req, res) {
  const work = await Work.findOne({
    where: {
      id: req.params.workId,
      userId: req.session.user.id
    }
  })
  if (work) {
    try {
      if (work.imageId) {
        // Delete image from Cloudinary
        await cloudinary.deleteImage(work.imageId)
      }
      // Delete Work from db
      await work.destroy()
    } catch (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while deleting a Work.'
      })
    }

    res.send({ title: work.title })
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
      title: helper.decodeHtml(work.title),
      artist: helper.decodeHtml(artistName),
      description: helper.decodeHtml(work.description),
      acquisitionUrl: helper.decodeHtml(work.acquisitionUrl),
      acquisitionDate: work.acquisitionDate,
      acquisitionCost: work.acquisitionCost,
      source: helper.decodeHtml(work.source),
      location: helper.decodeHtml(work.location),
      imageUrl: work.imageId ? cloudinary.imageUrl(work.imageId) : null
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
    attributes: ['id', 'title', 'artistId', 'imageId', 'acquisitionDate']
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
  if (work.imageId) {
    // Scale image to width=250
    const transformation_opts = {
      width: 250,
      crop: 'limit'
    }
    imageUrl = cloudinary.imageUrl(work.imageId, transformation_opts)
  }

  return {
    id: work.id,
    title: helper.decodeHtml(work.title),
    artist: helper.decodeHtml(artistName),
    imageUrl: imageUrl,
    acquisitionDate: work.acquisitionDate
  }
}

module.exports = {
  create,
  update,
  destroy,
  show,
  index
}
