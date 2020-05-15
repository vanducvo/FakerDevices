const wiston = require('winston');

module.exports = wiston.createLogger({
    level: 'error',
    transports: [
        new wiston.transports.Console({
            silent: process.env.NODE_ENV == 'production' ? true : false
        }),
        new wiston.transports.File({filename: './logs/logs.log'}),
    ],
    format: wiston.format.combine(
        wiston.format.timestamp(),
        wiston.format.printf(({ level, message, timestamp }) => 
            `${timestamp} :[${level}]: ${message}`
        )
    )
});