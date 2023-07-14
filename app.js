const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64b14a1c5c9fa766bb8e2745',
  };

  next();
});
app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// _id: '64b14a1c5c9fa766bb8e2745'
