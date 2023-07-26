const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const process = require('process');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const routes = require('./routes');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
process.on('uncaughtException', (err, origin) => {
  console.log(`${origin}${err.name} с текстом ${err.message} не обработана`);
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
