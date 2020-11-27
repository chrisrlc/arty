module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      required: true
    }
  })

  User.associate = function (models) {
    User.hasMany(models.Artwork, {
      foreignKey: 'userId'
    })
  }

  return User
}
