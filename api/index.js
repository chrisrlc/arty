const authConfig = require('./config/auth.config.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

const app = express()

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
// db.sequelize.sync()
db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(function () {
    return db.sequelize.sync({force: true});
  })
  .then(function () {
    return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
  })
  .then(function () {
    console.log('Drop and re-sync db.');
  }, function (err) {
    console.log(err);
  });

const SequelizeStore = require('connect-session-sequelize')(session.Store)
app.use(session({
  store: new SequelizeStore({
    db: db.sequelize,
  }),
  secret: authConfig.AUTH_USER_SECRET,
  resave: false,
  saveUninitialized: false
}))

// simple route
app.get('/', (req, res) => {
  res.json('Hola!!')
})

// bring in routes
app.use('/api', require('./routes/authentication'))
app.use('/api', require('./routes/work'))

// set port, listen for requests
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
