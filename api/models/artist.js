module.exports = (sequelize, Sequelize) => {
  const Artist = sequelize.define('artist', {
    name: {
      type: Sequelize.STRING,
      required: true
    }
  })

  Artist.associate = function (models) {
    Artist.hasMany(models.Work, {
      foreignKey: 'artistId'
    })

    Artist.hasMany(models.ArtistWebsite, {
      foreignKey: 'artistId'
    })
  }

  return Artist
}
