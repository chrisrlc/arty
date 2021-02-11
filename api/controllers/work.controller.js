const db = require('../models')
const Work = db.works
const Artist = db.artists
const cloudinary = require('../lib/cloudinary.js')
const { check, validationResult, matchedData } = require('express-validator')

// Create and save a new Work
async function create (req, res) {
  try {
    // Validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    // Filter req data
    const allowedData = matchedData(req, { includeOptionals: true })
    const userId = req.session.user.id

    // Build Work
    const work = Work.build({
      userId: userId,
      title: allowedData.title,
      description: allowedData.description,
      acquisitionUrl: allowedData.acquisitionUrl,
      acquisitionDate: allowedData.acquisitionDate,
      acquisitionCost: allowedData.acquisitionCost,
      source: allowedData.source,
      location: allowedData.location
    })

    // Set artistId
    if (allowedData.artist) {
      const [artist, created] = await Artist.findOrCreate({
        where: { name: allowedData.artist }
      })
      work.artistId = artist.id
    }

    // Set imageId
    if (allowedData.image) {
      // Upload image as base64 data uri string to Cloudinary
      const imageUpload = await cloudinary.uploadImage(allowedData.image)

      // Set up image data for db
      work.imageId = imageUpload.public_id
    }

    // Create Work in db
    await work.save()

    res.send({id: work.id, title: work.title})
  } catch (err) {
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
}

// Edit an existing Work
async function update (req, res) {
  try {
    // Validate
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      return res.status(400).send({ errors: validationErrors.array() })
    }

    // Filter req data
    const allowedData = matchedData(req, { includeOptionals: true })
    const workId = req.params.workId

    // Get work
    const work = await Work.findByPk(workId)

    // Set work attributes
    work.title = allowedData.title
    work.description = allowedData.description
    work.acquisitionUrl = allowedData.acquisitionUrl
    work.acquisitionDate = allowedData.acquisitionDate
    work.acquisitionCost = allowedData.acquisitionCost
    work.source = allowedData.source
    work.location = allowedData.location

    // Set artist
    if (allowedData.artist) {
      const [artist, created] = await Artist.findOrCreate({
        where: { name: allowedData.artist }
      })
      work.artistId = artist.id
    } else {
      work.artistId = null
    }

    // Set image
    if (allowedData.imageUpdated) {
      if (work.imageId) {
        // Delete old image from Cloudinary
        await cloudinary.deleteImage(work.imageId)
      }

      if (allowedData.image) {
        // Upload new image as base64 data uri string to Cloudinary
        const imageUpload = await cloudinary.uploadImage(allowedData.image)

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
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
}

async function destroy (req, res) {
  try {
    // Get work
    const work = await Work.findByPk(req.params.workId)

    if (work.imageId) {
      // Delete image from Cloudinary
      await cloudinary.deleteImage(work.imageId)
    }
    // Delete Work from db
    await work.destroy()

    res.send({ title: work.title })
  } catch (err) {
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
}

async function show (req, res) {
  try {
    // Get work
    const work = await Work.findByPk(req.params.workId)

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
      source: work.source,
      location: work.location,
      imageUrl: work.imageId ? cloudinary.imageUrl(work.imageId) : null
    })
  } catch (err) {
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
}

async function index (req, res) {
  try {
    const works = await Work.findAll({
      where: {
        userId: req.session.user.id
      },
      attributes: ['id', 'title', 'artistId', 'imageId', 'acquisitionDate']
    })

    const works_display = await Promise.all(works.map(displayWork))
    res.send(works_display)
  } catch (err) {
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
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
    title: work.title,
    artist: artistName,
    imageUrl: imageUrl,
    acquisitionDate: work.acquisitionDate
  }
}

// VALIDATIONS

async function validateUser (req, res, next) {
  if (!req.session.user) {
    res.status(401).send({ errors: [{ msg: 'User must be logged in.' }] })
  } else {
    // Great, user is logged in, moving on...
    next()
  }
}

async function validateAuthorizedUser (req, res, next) {
  if (!req.session.user) {
    res.status(401).send({errors: [{msg: 'User must be logged in.'}]})
  } else {
    const work = await Work.findByPk(req.params.workId)
    if (!work) {
      res.status(404).send({errors: [{msg: 'Art not found!'}]})
    } else if (work.userId !== req.session.user.id) {
        res.status(403).send({errors: [{msg: 'User not authorized.'}]})
    } else {
      // Great, user is authorized, moving on...
      next()
    }
  }
}

// TODO: Fix unlimited escaping of '&'
// TODO: check image size max?
const validateWork = [
  check('acquisitionDate', 'Acquisition Date is invalid').trim().isISO8601().optional({nullable: true}),
  check('acquisitionCost', 'Acquisition Cost is invalid').trim().isFloat({min: 0}).optional({nullable: true}),
  check('image', 'Image is invalid').trim().isDataURI().optional({nullable: true}),
  check('imageUpdated'),
  check('artist').trim().escape(),
  check('title').trim().escape(),
  check('description').trim().escape(),
  check('acquisitionUrl').trim().escape(),
  check('source').trim().escape(),
  check('location').trim().escape()
]

module.exports = {
  create,
  update,
  destroy,
  show,
  index,
  validateUser,
  validateAuthorizedUser,
  validateWork
}
