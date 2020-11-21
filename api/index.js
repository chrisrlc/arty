const authConfig = require("./config/auth.config.js");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: authConfig.AUTH_USER_SECRET,
  resave: false,
  saveUninitialized: false
}))

const db = require('./models');
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

// simple route
app.get('/', (req, res) => {
  res.json('Hola!!');
});

// bring in authentication routes
app.use(require("./routes/authentication"));

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
