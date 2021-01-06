module.exports = (sequelize, Sequelize) => {
  const Work = sequelize.define('work', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      }
    },
    artistId: {
      type: Sequelize.INTEGER,
      onDelete: 'SET NULL',
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
      type: Sequelize.DATE
    },
    acquisitionCost: {
      type: Sequelize.DECIMAL(19,4)
    },
    imageId: {
      type: Sequelize.STRING
    }
  })

  Work.associate = function (models) {
    Work.belongsTo(models.Artist, {
      onDelete: 'SET NULL'
    })

    Work.belongsTo(models.User, {
      onDelete: 'CASCADE'
    })
  }

  return Work
}
