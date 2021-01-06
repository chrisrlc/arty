module.exports = (sequelize, Sequelize) => {
  const Artist = sequelize.define('artist', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  })

  Artist.associate = function (models) {
    Artist.hasMany(models.Work)

    Artist.hasMany(models.ArtistWebsite)
  }

  return Artist
}
