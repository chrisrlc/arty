const db = require('../models')
const Work = db.works
const Artist = db.artists
const cloudinary = require('../lib/cloudinary')
const logger = require('../lib/logger')
const utils = require('../lib/utils')
const { check, validationResult, matchedData } = require('express-validator')
const { parseAsync } = require('json2csv')

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
      source: allowedData.source,
      location: allowedData.location
    })

    // Set acquisitionCost
    if (!allowedData.acquisitionCost && allowedData.acquistionCost !== 0) {
      // Convert non-0 falsey values (e.g. '') to null
      work.acquisitionCost = null
    } else {
      work.acquisitionCost = allowedData.acquisitionCost
    }

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
    logger.error(err.message)
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
}

// Edit an existing Work
async function update (req, res) {
  try {
    // Validate
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
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
    work.source = allowedData.source
    work.location = allowedData.location

    // Set acquisitionCost
    if (!allowedData.acquisitionCost && allowedData.acquistionCost !== 0) {
      // Convert non-0 falsey values (e.g. '') to null
      work.acquisitionCost = null
    } else {
      work.acquisitionCost = allowedData.acquisitionCost
    }

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
    logger.error(err.message)
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

    res.send({
      id: work.id,
      title: work.title,
      artist: await artistName(work.artistId),
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

    const displayableWorks = await Promise.all(works.map(displayableWork))
    res.send(displayableWorks)
  } catch (err) {
    logger.error(err.message)
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
}

async function displayableWork (work) {
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
    artist: await artistName(work.artistId),
    imageUrl: imageUrl,
    acquisitionDate: utils.friendlyDate(work.acquisitionDate)
  }
}

async function count (req, res) {
  try {
    res.send({
      count: await Work.count()
    })
  } catch (err) {
    logger.error(err.message)
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
  }
}

async function artistName (artistId) {
  let artistName = null
  if (artistId) {
    const artist = await Artist.findByPk(artistId)
    artistName = artist.name
  }

  return artistName
}

async function downloadableWork (work) {
  return {
    title: work.title,
    artist: await artistName(work.artistId),
    description: work.description,
    acquisitionUrl: work.acquisitionUrl,
    acquisitionDate: utils.friendlyDate(work.acquisitionDate),
    acquisitionCost: work.acquisitionCost,
    source: work.source,
    location: work.location
  }
}

async function download (req, res) {
  try {
    const works = await Work.findAll({
      where: {
        userId: req.session.user.id
      }
    })
    const downloadableWorks = await Promise.all(works.map(downloadableWork))

    const fields = ['title', 'artist', 'description', 'acquisitionUrl', 'acquisitionDate', 'acquisitionCost',
      'source', 'location']
    const opts = { fields }
    const csv = await parseAsync(downloadableWorks, opts)

    res.header('Content-Type', 'text/csv')
    res.attachment('inventory.csv')
    res.send(csv)
  } catch (err) {
    logger.error(err.message)
    res.status(500).send({ errors: [{ msg: 'Some error occurred.' }] })
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

const validateWork = [
  check('acquisitionDate', 'Acquisition Date is invalid').trim().isISO8601()
    .optional({ nullable: true }),
  check('acquisitionCost', 'Acquisition Cost is invalid').trim().isFloat({ min: 0 })
    .optional({ nullable: true, checkFalsy: true }),
  check('image', 'Image is invalid').trim().isDataURI().custom(value => {
    // Remove initial metadata from base64 data uri string, e.g. 'data:image/jpeg;base64,' or 'data:image/png;base64,'
    const i = value.indexOf('base64') + 7
    const base64str = value.substr(i)

    // Actual cloudinary max is 10485760
    if (Buffer.from(base64str, 'base64').toString().length > 10100000) {
      throw new Error('File size too large. Maximum is 10 MB.')
    } else {
      return value
    }
  }).optional({ nullable: true }),
  check('imageUpdated'),
  check('artist').trim(),
  check('title').trim(),
  check('description').trim(),
  check('acquisitionUrl').trim(),
  check('source').trim(),
  check('location').trim()
]

module.exports = {
  create,
  update,
  destroy,
  show,
  index,
  count,
  download,
  validateUser,
  validateAuthorizedUser,
  validateWork
}
