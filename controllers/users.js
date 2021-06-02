const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.createUser = (req, res, next) => {
  const {name, email, password} = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
			res.send({ message: err.message });
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
			res.send(token);
      res.cookie('jwt', 'Bearer ' + token, { 
        maxAge: 3600000,
        secure: true,
        httpOnly: true,
        sameSite: 'None',
      })
        .end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.getUserMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.send('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      res.send('Запрашиваемый пользователь не найден');
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        res.send('Запрашиваемый пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
			res.send('Произошла ошибка при обновлении данных');
    });
};