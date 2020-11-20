const authConfig = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const authUserSecret = authConfig.AUTH_USER_SECRET

// Create and save a new User
async function create (req, res) {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email or password can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 12) // Encrypt password
  };

  // Save User in the database
  try {
    res.send(await User.create(user));
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  }
}

// Find a single User with an email
async function findOne (email) {
  try {
    return await User.findOne({where: {email: email}});
  } catch (err) {
    throw err;
  }
}

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async function (email, password, done) {
      try {
        const user = await findOne(email)
        console.log(user)

        if (user) {
          const validation = await comparePasswords(password, user.password)
          if (validation) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Authentication failed' })
          }
        } else {
          return done(null, false, { message: 'Authentication failed' })
        }
      } catch (err) {
        return done(err)
      }
    }
  )
)

async function comparePasswords (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

function signUserToken (user) {
  return jwt.sign({
    id: user.id,
    email: user.email
  }, authUserSecret)
}

function login (req, res) {
  passport.authenticate('local', { session: false }, (err, user, message) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(403).send(message);
    } else {
      const token = signUserToken(user)
      res.send({ token })
    }
  })(req, res)
}

module.exports = {
  create,
  findOne,
  login
}
