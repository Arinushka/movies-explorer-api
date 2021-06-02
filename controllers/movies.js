const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const InvalidRequestError = require('../errors/InvalidRequestError');

module.exports.addMovie = (req, res, next) => {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
    Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
      .then((movie) => res.send(movie))
      .catch((err) => {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
          next(new InvalidRequestError('Переданы некорректные данные'));
        } else {
          next(err);
        }
      })
  };

  module.exports.getMovies = (req, res, next) => {
    Movie.find({})
      .then((movie) => res.send(movie))
      .catch(next)
  };

  module.exports.deleteMovie = (req, res, next) => {
    Movie.findById(req.params.movieId)
      .then((movie) => {
        if (!movie) {
            throw new NotFoundError('Фильм с указанным _id не найден');
        } if (req.user._id !== movie.owner._id.toString()) {
            throw new ForbiddenError('Удалять можно только свои фильмы');
        }
        Movie.findByIdAndDelete(movie)
          .then(() => res.status(200).send({ message: 'Успешно' }))
          .catch((err) => {
            if (err.name === 'CastError' || err.name === 'ValidationError') {
              next(new InvalidRequestError('Переданы некорректные данные'));
            } else {
              next(err);
            }
          });
      })
      .catch((err) => {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
          next(new InvalidRequestError('Переданы некорректные данные'));
        } else {
          next(err);
        }
      });
  };