const router = require('express').Router();
const auth = require('../middlewares/auth');
const user = require('./users');
const movie = require('./movies');
const { createUser, login } = require('../controllers/users');


router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth, user);
router.use(auth, movie);

module.exports = router;