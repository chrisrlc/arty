const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.js')(sequelize, Sequelize)
db.artworks = require('./artwork.js')(sequelize, Sequelize)
db.artists = require('./artist.js')(sequelize, Sequelize)
db.artistWebsites = require('./artist-website.js')(sequelize, Sequelize)

module.exports = db
