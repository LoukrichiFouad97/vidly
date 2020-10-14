const morgan = require("morgan");
const debug = require("debug")("app:startup");
const winstonLogger = require("../models/logger");
const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (app) {
	if (process.env.NODE_ENV === "development") {
		app.use(morgan("tiny"));
		debug("morgan in development env");
	}

	if (!process.env.VIDLY_JWT_WEB_TOKEN) {
		console.log("Fatal error JWT is not defined");
		process.exit(1);
	}

	if (!process.env.NODE_ENV !== "production") {
		winstonLogger.add(
			new winston.transports.Console({
				format: winston.format.simple(),
				colorize: true,
				prettyPrint: true,
			})
		);
	}
};
