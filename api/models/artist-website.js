module.exports = (sequelize, Sequelize) => {
  const ArtistWebsite = sequelize.define('artistWebsite', {
    artistId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'artists',
        key: 'id'
      }
    },
    url: {
      type: Sequelize.STRING,
      required: true
    }
  })

  ArtistWebsite.associate = function (models) {
    ArtistWebsite.belongsTo(models.Artist, {
      foreignKey: 'artistId',
      onDelete: 'CASCADE'
    })
  }

  return ArtistWebsite
}
