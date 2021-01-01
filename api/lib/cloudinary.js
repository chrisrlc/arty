const cloudinary = require('cloudinary').v2
const cloudinaryConfig = require('../config/cloudinary.config.js')

cloudinary.config({
  cloud_name: cloudinaryConfig.CLOUD_NAME,
  api_key: cloudinaryConfig.API_KEY,
  api_secret: cloudinaryConfig.API_SECRET,
})

async function uploadImage (image) {
  return await cloudinary.uploader.upload(image)
}

async function deleteImage (cloudinaryId) {
  return await cloudinary.uploader.destroy(cloudinaryId)
}

module.exports = {
  uploadImage,
  deleteImage
}
