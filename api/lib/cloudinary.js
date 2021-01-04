const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('../config/cloudinary.config.js')

cloudinary.config({
  cloud_name: cloudinaryConfig.CLOUD_NAME,
  api_key: cloudinaryConfig.API_KEY,
  api_secret: cloudinaryConfig.API_SECRET,
})

async function uploadImage (image) {
  // Saves image with max 1200x1200 dimensions and jpg format
  return await cloudinary.uploader.upload(image, {width: 1200, height: 1200, crop: 'limit', format: 'jpg'})
}

async function deleteImage (publicId) {
  return await cloudinary.uploader.destroy(publicId)
}

function imageUrl (publicId, transformation_opts={}) {
  return cloudinary.url(`${publicId}.jpg`, transformation_opts)
}

module.exports = {
  uploadImage,
  deleteImage,
  imageUrl
}
