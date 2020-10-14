const mongoose = require("mongoose");
const winstonLogger = require("../models/logger");
const config = require("config");

module.exports = function () {
	const db = config.get("db");

	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() => winstonLogger.info(`connected to: ${db}`));
};
