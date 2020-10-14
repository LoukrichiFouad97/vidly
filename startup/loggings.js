const winstonLogger = require("../models/logger");
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
	winstonLogger.add(
		new winston.transports.MongoDB({
			db: "mongodb://localhost/vidly",
			level: "info",
		})
	);

	winston.ExceptionHandler(
		new winston.transports.Console({
			format: winston.format.simple(),
			colorize: true,
			prettyPrint: true,
		}),

		new winston.transports.File({ filename: "unhandledException" })
	);

	process.on("unhandledRejection", (err) => {
		throw err;
	});

	winstonLogger.add(
		new winston.transports.File({
			filename: "logfile.log",
			format: winston.format.simple(),
		})
	);
};
