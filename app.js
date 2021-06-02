const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const bodyParser = require('body-parser');
const processingErrors = require('./middlewares/processingErrors');
const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use('/', router);

app.use(processingErrors);

app.listen(PORT) 