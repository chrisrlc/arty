require('dotenv').config()
const authConfig = require('./config/auth.config.js')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

// Create express instance
const app = express()

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '50mb' }))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
db.sequelize.sync()

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
  res.end()
})

// Require API routes
const authentication = require('./routes/authentication')
const work = require('./routes/work')

// Import API Routes
app.use('/auth', authentication)
app.use('/art', work)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`)
  })
}
