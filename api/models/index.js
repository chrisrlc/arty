const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.js')(sequelize, Sequelize)
db.works = require('./work.js')(sequelize, Sequelize)
db.artists = require('./artist.js')(sequelize, Sequelize)
db.artistWebsites = require('./artist-website.js')(sequelize, Sequelize)

module.exports = db
