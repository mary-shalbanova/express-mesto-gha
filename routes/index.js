const routes = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const adminRoutes = require('./admin');
const auth = require('../middlewares/auth');
const hasToken = require('../middlewares/tokenValidation');

const NotFoundError = require('../errors/not-found-err');

routes.use('/users', hasToken, auth, usersRoutes);
routes.use('/cards', hasToken, auth, cardsRoutes);
routes.use('/', adminRoutes);
routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;
