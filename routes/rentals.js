const router = require("express").Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");

const { Rental, validate } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movies");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
	const rental = await Rental.find().sort("-dateOut");
	res.send(rental);
});

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send("Invalid customer");

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send("invalid Movie");

	if (Movie.numberInStock === 0)
		return res.status(400).send("Movie is not in stock");

	let rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate,
		},
	});

	try {
		new Fawn.Task()
			.save("rentals", rental)
			.update(
				"movies",
				{ _id: movie._id },
				{
					$inc: {
						numberInStock: -1,
					},
				}
			)
			.run();
	} catch (err) {
		console.log("2 phase commit failed");
	}

	res.send(rental);
});

module.exports = router;
