const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const process = require('process');
const { errors } = require('celebrate');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(errorHandler);

process.on('uncaughtException', (err, origin) => {
  console.log(`${origin}${err.name} с текстом ${err.message} не обработана`);
});

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
