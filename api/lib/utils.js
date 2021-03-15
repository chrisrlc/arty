function friendlyDate (date) {
  if (!date) return null

  const d = new Date(date)
  return d.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
}

module.exports = {
  friendlyDate
}
