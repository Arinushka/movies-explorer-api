const { getUserMe, updateProfile } = require('../controllers/users');

const users = require('express').Router();

users.get('/users/me', getUserMe);
users.patch('/users/me', updateProfile);

module.exports = users;