const router = require("express").Router();

// middlewares
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validateObjectId = require("../middlewares/validateObjectId");

// models
const { Genre, validate } = require("../models/genre");

// Read
router.get("/", async (req, res) => {
	const genres = await Genre.find().sort("name");
	res.send(genres);
});

// Write
router.post("/", auth, async (req, res) => {
	// [1] validate genre data shap
	// [2] create movie genre
	// [3] add it to genres and send all genres to user

	// [1]
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// [2]
	const genre = new Genre({ name: req.body.name });

	// [3]
	await genre.save();
	res.status(200).json({
		success: true,
		data: genre,
	});
});

// Update
router.put("/:id", async (req, res) => {
	// [1] validate the genre schema
	// [2] update the genre
	// [3] send it to the user

	// [1]
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// [2]
	const genre = await Genre.findByIdAndUpdate(
		req.body.id,
		{
			name: req.body.name,
		},
		{ new: true }
	);
	if (!genre) return res.status(404).send("Not found");

	// [3]
	res.send(genre);
});

// Delete
router.delete("/:id", [auth, admin], async (req, res) => {
	// [1] find the genre && delete it
	// [2] if genre is deleted return GENRE NOT FOUND to user
	// [3] send the deleted genre back to user

	// [1]
	const genre = await Genre.findByIdAndDelete(req.body.id);

	// [2]
	if (!genre) return res.status(404).send("GENRE NOT FOUND");

	// [3]
	res.send(genre);
});

// Find a singal genre
router.get("/:id", validateObjectId, async (req, res) => {
	const genre = await Genre.findById(req.params.id);

	!genre && res.status(404).send("genre with the given id not found");

	res.send(genre);
});

module.exports = router;
