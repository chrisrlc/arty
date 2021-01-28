require('dotenv').config()
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

// bring in routes
app.use('/api/auth', require('./routes/authentication'))
app.use('/api/art', require('./routes/work'))

// set port, listen for requests
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
