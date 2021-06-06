const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const processingErrors = require('./middlewares/processingErrors');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger'); 
const { PORT = 3000 } = process.env;
const helmet = require('helmet');
const { limiter } = require('./middlewares/limiter');
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.use(requestLogger);
app.use(limiter);
app.use('/', router);
app.use(errorLogger);
app.use('*', (req, res, next) => { // eslint-disable-line
    next(new NotFoundError('Ресурс не найден'));
  });
app.use(errors());
app.use(processingErrors);

app.listen(PORT) 