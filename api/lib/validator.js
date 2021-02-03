const { validationResult } = require('express-validator')

function validationErrorString (validationErrors) {
  return validationErrors.array().map(err => err.msg).join(' ')
}

module.exports = {
  validationResult,
  validationErrorString
}
