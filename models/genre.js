const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 5,
		maxlength: 25,
		trim: true,
		lowercase: true,
	},
});

const Genre = mongoose.model("genre", genreSchema);

// find genre
const findGenre = async (genreId) => {
	const genre = await Genre.findById(genreId);
	return genre;
};

// validate genre schema
const genreValidation = (genre) => {
	const schema = {
		name: Joi.string().min(5).max(25).required(),
	};

	const result = Joi.validate(genre, schema);
	return result;
};

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.findGenre = findGenre;
exports.validate = genreValidation;
