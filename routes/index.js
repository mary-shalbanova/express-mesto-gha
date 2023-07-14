const routes = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const { ERROR_CODE_NOT_FOUND } = require('../utils/constants');

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/*', (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({
    message: 'Страница не найдена',
  });
});

module.exports = routes;
