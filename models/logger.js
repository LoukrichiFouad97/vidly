const winston = require("winston");
require("winston-mongodb");

const winstonLogger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	defaultMeta: { service: "user-service" },
	transports: [
		new winston.transports.MongoDB({
			db: "mongodb://localhost/vidly",
			level: "info",
		}),
	],
});

module.exports = winstonLogger;
