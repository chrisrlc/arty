function sanitize (content) {
  if (!content || !content.trim()) {
    return ''
  }

  return content.trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

function decodeHtml (content) {
  if (!content) {
    return ''
  }

  return content.replace(/&amp;/ig, '&')
    .replace(/&lt;/ig, '<')
    .replace(/&gt;/ig, '>')
    .replace(/&quot;/ig, '"')
    .replace(/&#x27;/ig, "'")
    .replace(/&#x2F;/ig, '/')
}

module.exports = {
  sanitize,
  decodeHtml
}
