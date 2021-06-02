const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../../react-mesto-api-full/backend/errors/unauthorizedError');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 2,
		maxlength: 30,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (v) => isEmail(v),
			message: 'Неправильный формат почты',
		},
	},
	password: {
		type: String,
		required: true,
		select: false,
	},


});

userSchema.statics.findUserByCredentials = function (email, password, next) { // eslint-disable-line
	return this.findOne({ email }).select('+password')
	  .then((user) => {
		if (!user) {
		  throw new UnauthorizedError('Неправильные почта или пароль');
		}
		return bcrypt.compare(password, user.password)
		  .then((matched) => {
			if (!matched) {
			  throw new UnauthorizedError('Неправильные почта или пароль');
			}
			return user;
		  })
		  .catch(next)
	  })
	  .catch(next)
  };

module.exports = mongoose.model('user', userSchema);