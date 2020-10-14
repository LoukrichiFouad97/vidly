const mongoose = require("mongoose");
const Joi = require("joi");

// customer schema
const CustomerSchema = new mongoose.Schema({
	isGold: { type: Boolean, required: true },
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 25,
		trim: true,
		lowercase: true,
	},
	phone: { type: Number, required: true, maxlength: 10 },
});

const Customer = mongoose.model("customer", CustomerSchema);

// validate schema
const validateCustomer = (customer) => {
	const schema = {
		isGold: Joi.boolean().required(),
		name: Joi.string().required(),
		phone: Joi.number().required(),
	};

	return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
