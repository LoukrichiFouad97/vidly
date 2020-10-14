const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
	const token = req.header("x-auth-token");
	if (!token) return res.status(401).send("Access denied");

	try {
		const decoded = jwt.verify(token, process.env.VIDLY_JWT_WEB_TOKEN);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(400).send("Invalide token");
	}
};
