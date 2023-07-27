const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new UnauthorizedError('Передан некорректный токен'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
