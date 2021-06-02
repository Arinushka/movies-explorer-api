const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
	country: {
		type: String,
		required: true,
	},
	director: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		validate: {
			validator(url) {
				return /(https?):\/\/\S{2,}\.\S{2,}/.test(url);
			},
			message: 'Неверный формат ссылки',
		},
		required: true,
	},
	trailer: {
		type: String,
		validate: {
			validator(url) {
				return /(https?):\/\/\S{2,}\.\S{2,}/.test(url);
			},
			message: 'Неверный формат ссылки',
		},
		required: true,
	},
	thumbnail: {
		type: String,
		validate: {
			validator(url) {
				return /(https?):\/\/\S{2,}\.\S{2,}/.test(url);
			},
			message: 'Неверный формат ссылки',
		},
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	movieId: {
		type: Number,
		required: true,
	},
	nameRU: {
		type: String,
		required: true,
	},
	nameEN: {
		type: String,
		required: true,
	},
});