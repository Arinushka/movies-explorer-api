const router = require('express').Router();

const user = require('./users');
const movie = require('./movies');
router.use(user);
router.use(movie);

module.exports = router;