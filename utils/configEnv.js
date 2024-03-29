require('dotenv').config();

module.exports = {
  JWT_SECRET: (process.env.NODE_ENV === 'production') ? process.env.JWT_SECRET : 'dev-secret',
  DATA_BASE: (process.env.NODE_ENV === 'production') ? process.env.DATA_BASE : 'mongodb://localhost:27017/moviedb',
  PORT: (process.env.NODE_ENV === 'production') ? process.env.PORT : 3000,
};
