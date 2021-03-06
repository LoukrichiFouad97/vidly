const router = require("express").Router();
const { Movie, validate } = require("../models/movies");
const Genre = require("../models/genre");

router.get("/", async (req, res) => {
	const movie = await Movie.find().sort("name");
	res.send(movie);
	console.log(movie);
});

router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(404).send("genre not found");

	const movie = new Movie({
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name,
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate,
	});

	const result = await movie.save();
	res.send(result);
	console.log(result);
});

router.put("/:id", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(404).send("genre not found");

	const movie = await Movie.findByIdAndUpdate(
		req.body.id,
		{
			title: req.body.title,
			genre: {
				_id: genre._id,
				name: genre.name,
			},
			numberInStock: req.body.numberInStock,
			dailyRentalRate: req.body.dailyRentalRate,
		},
		{ new: true }
	);

	if (!movie) return res.status(404).send("movie not found");

	res.send(movie);
});

router.delete("/:id", async (req, res) => {
	const movie = await Movie.findByIdAndDelete(req.body.id);
	res.send(movie);
});

module.exports = router;
