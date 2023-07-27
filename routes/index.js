const routes = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const adminRoutes = require('./admin');
const auth = require('../middlewares/auth');
const hasToken = require('../middlewares/tokenValidation');

const NotFoundError = require('../errors/not-found-err');

routes.use('/', adminRoutes);

routes.use(hasToken);
routes.use(auth);
routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

routes.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;
