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
  });

  return User;
};
