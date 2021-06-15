require('dotenv').config()
const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json()),
  transports: [
    //
    // - Write all logs with level `error` and below to `logs/error.log`, incl. uncaught exceptions and promise rejections
    // - Write all logs with level `info` and below to `logs/combined.log`
    //
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true,
      handleRejections: true
    }),
    new transports.File({
      filename: 'logs/combined.log'
    }),
  ],
  exitOnError: false
})

//
// If we're not in production then log to the `console` with the format:
// `${info.timestamp} ${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf((info) => `${info.timestamp} ${info.level}: ${info.stack ? info.stack : info.message}`)
    ),
  }))
}

logger.stream = {
  write: function(message){
    logger.info(message)
  }
}

module.exports = logger
