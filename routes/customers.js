const router = require("express").Router();
const { Customer, validate } = require("../models/customer");

// Get all customers
router.get("/", async (req, res) => {
	const customer = await Customer.find().sort("name");
	res.send(customer);
});

// add a customer
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({
		isGold: req.body.isGold,
		name: req.body.name,
		phone: req.body.phone,
	});

	customer = await customer.save();
	res.send(customer);
});

// update a customer
router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (!error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findByIdAndUpdate(
		req.body.id,
		{
			isGold: req.body.isGold,
			name: req.body.name,
			phone: req.body.phone,
		},
		{ new: true }
	);
	if (!customer) return res.status(404).send("Customer is not registered");

	res.send(customer);
});

// delete a customer
router.delete("/:id", async (req, res) => {
	const customer = await Customer.findByIdAndDelete(req.body.id);
	if (!customer)
		return res.status(404).send("Customer is already not registered");

	res.send(customer);
});

// Get a singal customer
router.get("/:id", async (req, res) => {
	const customer = await Customer.findById(req.body.id);
	if (!customer) return res.status(404).send("customer not found");

	res.send(customer);
});

module.exports = router;
