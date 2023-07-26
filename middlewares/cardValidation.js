const { celebrate, Joi } = require('celebrate');

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = { createCardValidation, cardIdValidation };
