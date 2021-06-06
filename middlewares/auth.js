const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../../react-mesto-api-full/backend/errors/unauthorizedError');
const { AUTHORIZATION_ERROR } = require('../utils/constans');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(AUTHORIZATION_ERROR));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(AUTHORIZATION_ERROR));
  }
  req.user = payload;
  return next();
};
