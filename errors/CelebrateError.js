const validator = require('validator');
const { CelebrateError } = require('celebrate');
const { LINK_ERROR } = require('../utils/constans');

module.exports = function urlValidation(value) {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new CelebrateError(LINK_ERROR);
  }
  return value;
};
