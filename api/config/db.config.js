module.exports = {
  HOST: "localhost",
  USER: "artyUser",
  PASSWORD: "artyarty",
  DB: "arty",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
