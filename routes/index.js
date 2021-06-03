const router = require('express').Router();
const auth = require('../middlewares/auth');
const user = require('./users');
const movie = require('./movies');
const { createUser, login } = require('../controllers/users');
const { registerValidation, authValidation } = require('../middlewares/bodyValidation');


router.post('/signup', registerValidation, createUser);
router.post('/signin', authValidation, login);

router.use(auth, user);
router.use(auth, movie);

module.exports = router;