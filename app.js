const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes')
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use('/', router);

app.listen(PORT) 