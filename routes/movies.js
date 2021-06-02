const { addMovie, getMovies, deleteMovie } = require('../controllers/movies');

const movies = require('express').Router();

movies.get('/movies', getMovies);
movies.post('/movies', addMovie);
movies.delete('/movies/:movieId', deleteMovie);

module.exports = movies;