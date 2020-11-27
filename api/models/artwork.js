module.exports = (sequelize, Sequelize) => {
  const Artwork = sequelize.define('artwork', {
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      }
    },
    artistId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'artists',
        key: 'id'
      }
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    acquisitionUrl: {
      type: Sequelize.STRING
    },
    acquisitionDate: {
      type: Sequelize.DATEONLY
    },
    acquisitionCost: {
      type: Sequelize.STRING
    }
  })

  Artwork.associate = function (models) {
    Artwork.belongsTo(models.Artist, {
      foreignKey: 'artistId'
    })

    Artwork.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }

  return Artwork
}
