module.exports = (sequelize, Sequelize) => {
  const Work = sequelize.define('work', {
    userId: {
      type: Sequelize.INTEGER,
      require: true,
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
      type: Sequelize.DECIMAL(19,4)
    }
  })

  Work.associate = function (models) {
    Work.belongsTo(models.Artist, {
      foreignKey: 'artistId'
    })

    Work.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }

  return Work
}
