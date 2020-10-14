const winstonLogger = require("../models/logger");
const winston = require("winston");

module.exports = function (err, req, res, next) {
	// log error
	winstonLogger.error(err.message, err);

	res.status(500).send("Something failed!!!");
};
