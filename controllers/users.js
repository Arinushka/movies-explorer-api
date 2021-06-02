const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const InvalidRequestError = require('../errors/InvalidRequestError');
const MongoError = require('../errors/MongoError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.createUser = (req, res, next) => {
  const {name, email, password} = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else if (err.name === 'MongoError') {
        next(new MongoError('Эта почта уже используется'));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
			res.status(200).send(token);
      res.cookie('jwt', 'Bearer ' + token, { 
        maxAge: 3600000,
        secure: true,
        httpOnly: true,
        sameSite: 'None',
      })
        .end();
    })
    .catch((err) => {
      if (err.name === 'Error') next(new UnauthorizedError('Неправильные почта или пароль'));
      next(err);
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError'|| err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError'|| err.name === 'ValidationError') {
        next(new InvalidRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};