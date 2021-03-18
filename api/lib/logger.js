const { createLogger, format, transports, addColors } = require('winston')

const logger = createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warn',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    //
    // - Write all logs with level `error` and below to `logs/error.log`
    // - Write all logs with level `info` and below to `logs/combined.log`
    //
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],

  // TODO: Make exceptionHandler and rejectionHandler work...
  exceptionHandlers: [
    // Write all uncaught exceptions to `logs/exceptions.log`
    new transports.File({ filename: 'logs/exceptions.log' })
  ],
  exitOnError: false
})

//
// If we're not in production then log to the `console` with the format:
// `${info.timestamp} ${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
  }))
}

logger.stream = {
  write: function(message){
    logger.info(message);
  }
}

module.exports = logger
