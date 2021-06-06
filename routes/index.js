const router = require('express').Router();
const auth = require('../middlewares/auth');
const user = require('./users');
const movie = require('./movies');
const { createUser, login } = require('../controllers/users');
const { registerValidation, authValidation } = require('../middlewares/bodyValidation');
const NotFoundError = require('../../react-mesto-api-full/backend/errors/notFoundError');
const { NOT_FOUND_ERROR } = require('../utils/constans');


router.post('/signup', registerValidation, createUser);
router.post('/signin', authValidation, login);

router.use(auth, user);
router.use(auth, movie);
router.use((req,res,next)=>{
    next(new NotFoundError(NOT_FOUND_ERROR));
})
module.exports = router;