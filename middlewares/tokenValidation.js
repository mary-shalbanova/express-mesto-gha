const { celebrate, Joi } = require('celebrate');

const hasToken = celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }).unknown(),
});

module.exports = hasToken;
