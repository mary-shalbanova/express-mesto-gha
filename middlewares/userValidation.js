const { celebrate, Joi } = require('celebrate');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const authValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/(https?:\/\/)(w{3}\.)?(\w-?)+\.[A-Za-z0-9](-\._~:\/?#\[]@!$&'()*\+,;=#?)?/).required(),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  createUserValidation,
  authValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
  getUserByIdValidation,
};
