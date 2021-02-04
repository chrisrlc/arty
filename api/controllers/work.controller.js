const db = require('../models')
const Work = db.works
const Artist = db.artists
const cloudinary = require('../lib/cloudinary.js')
const { check, validationResult } = require('express-validator')

// Create and save a new Work
async function create (req, res) {
  // TODO: 403 if no user

  try {
    // Validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    // Build Work
    const work = Work.build({
      userId: req.session.user.id,
      title: req.body.title,
      description: req.body.description,
      acquisitionUrl: req.body.acquisitionUrl,
      acquisitionDate: req.body.acquisitionDate,
      acquisitionCost: req.body.acquisitionCost,
      source: req.body.source,
      location: req.body.location
    })

    // Set artistId
    if (req.body.artist) {
      const [artist, created] = await Artist.findOrCreate({
        where: { name: req.body.artist }
      })
      work.artistId = artist.id
    }

    // Set imageId
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
      errors: [{
        param: 'misc',
        msg: err.message || 'Some error occurred.'
      }]
    })
  }
}

// Edit an existing Work
async function update (req, res) {
  // TODO: 403 if no user

  try {
    // Validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    // Get work
    const work = await Work.findOne({
      where: {
        id: req.params.workId,
        userId: req.session.user.id
      }
    })

    if (work) {
      work.title = req.body.title
      work.description = req.body.description
      work.acquisitionUrl = req.body.acquisitionUrl
      work.acquisitionDate = req.body.acquisitionDate
      work.acquisitionCost = req.body.acquisitionCost
      work.source = req.body.source
      work.location = req.body.location

      // Set artist
      if (req.body.artist) {
        const [artist, created] = await Artist.findOrCreate({
          where: { name: req.body.artist }
        })
        work.artistId = artist.id
      } else {
        work.artistId = null
      }

      // Set image
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
    } else {
      res.status(500).send({
        errors: [{
          param: 'misc',
          msg: 'No art found!'
        }]
      })
    }
  } catch (err) {
    res.status(500).send({
      errors: [{
        param: 'misc',
        msg: err.message || 'Some error occurred.'
      }]
    })
  }
}

async function destroy (req, res) {
  try {
    const work = await Work.findOne({
      where: {
        id: req.params.workId,
        userId: req.session.user.id
      }
    })
    if (work) {
      if (work.imageId) {
        // Delete image from Cloudinary
        await cloudinary.deleteImage(work.imageId)
      }
      // Delete Work from db
      await work.destroy()

      res.send({ title: work.title })
    } else {
      res.status(500).send({
        errors: [{
          param: 'misc',
          msg: 'Art not found!'
        }]
      })
    }
  } catch (err) {
    res.status(500).send({
      errors: [{
        param: 'misc',
        msg: err.message || 'Some error occurred.'
      }]
    })
  }
}

async function show (req, res) {
  // TODO: 403 if no user

  try {
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
        source: work.source,
        location: work.location,
        imageUrl: work.imageId ? cloudinary.imageUrl(work.imageId) : null
      })
    } else {
      res.status(500).send({
        errors: [{
          param: 'misc',
          msg: 'Art not found!'
        }]
      })
    }
  } catch (err) {
    res.status(500).send({
      errors: [{
        param: 'misc',
        msg: err.message || 'Some error occurred.'
      }]
    })
  }
}

async function index (req, res) {
  // TODO: 403 if no user

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
    res.status(500).send({
      errors: [{
        param: 'misc',
        msg: err.message || 'Some error occurred.'
      }]
    })
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

// VALIDATION SCHEMAS

// TODO: Fix unlimited escaping of '&'
const validations = [
  check('acquisitionDate', 'Acquisition Date is invalid').trim().isISO8601().optional(),
  check('acquisitionCost', 'Acquisition Cost is invalid').trim().isFloat({min: 0}).optional(),
  check('image', 'Image is invalid').trim().isDataURI().optional(),
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
  validations
}
