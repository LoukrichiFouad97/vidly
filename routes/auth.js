const bcrypt = require("bcrypt");
const router = require("express").Router();
const Joi = require("joi");

const { User } = require("../models/user.js");

router.post("/", async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send("Invalid Email or Password");

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid Email or Password");

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("Invalid Email or Password");

	const token = user.generateAuthToken();
	res.send(token);
});

const validateUser = (req) => {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	};

	return Joi.validate(req, schema);
};

module.exports = router;
