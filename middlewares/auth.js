const jwt = require('jsonwebtoken');
const { ERROR_CODE_UNAUTHORIZED } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    res.status(ERROR_CODE_UNAUTHORIZED).send({ message: 'Передан некорректный токен' });
  }
  req.user = payload;
  next();
};

module.exports = auth;
