module.exports = (sequelize, Sequelize) => {
  const ArtistWebsite = sequelize.define('artistWebsite', {
    artistId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'artists',
        key: 'id'
      }
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  ArtistWebsite.associate = function (models) {
    ArtistWebsite.belongsTo(models.Artist, {
      onDelete: 'CASCADE'
    })
  }

  return ArtistWebsite
}
