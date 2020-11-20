const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
  // origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./api/models');
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
});

// simple route
app.get('/', (req, res) => {
  res.json('Hola!!');
});

// bring in authentication routes
// const authenticationRoutes = require("./api/routes/authentication");
app.use(require("./api/routes/authentication"))

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});