const Movie = require('../models/movie');

module.exports.addMovie = (req, res, next) => {
    const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;
    Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
      .then((movie) => res.send(movie))
      .catch((err) => {
        res.send(err.message)
      });
  };

  module.exports.getMovies = (req, res) => {
    Movie.find({})
      .then((movie) => res.send(movie))
      .catch((err) => {
        res.send('Переданы некорректные данные')
      });
  };

  module.exports.deleteMovie = (req, res, next) => {
    Movie.findById(req.params.movieId)
      .then((movie) => {
        if (!movie) {
          res.send('Фильм с указанным _id не найден');
        } if (req.user._id !== movie.owner._id.toString()) {
          res.send('Удалять можно только свои фильмы');
        }
        Movie.findByIdAndDelete(movie)
          .then(() => res.status(200).send({ message: 'Успешно' }))
          .catch((err) => {
            res.send('Переданы некорректные данные')
          });
      })
      .catch((err) => {
        res.send('Переданы некорректные данные')
      });
  };