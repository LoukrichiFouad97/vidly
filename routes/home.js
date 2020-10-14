const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("index", {
		title: "vidly",
		message: "Welcome to vidly",
	});
});

module.exports = router;
