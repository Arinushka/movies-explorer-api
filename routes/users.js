const { getUserMe, updateProfile } = require('../controllers/users');
const { updateValidation } = require('../middlewares/bodyValidation');

const users = require('express').Router();

users.get('/users/me', getUserMe);
users.patch('/users/me', updateValidation, updateProfile);

module.exports = users;