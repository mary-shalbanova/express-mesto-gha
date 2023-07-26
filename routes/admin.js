const adminRoutes = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { createUserValidation, authValidation } = require('../middlewares/userValidation');

adminRoutes.post('/signin', authValidation, login);
adminRoutes.post('/signup', createUserValidation, createUser);

module.exports = adminRoutes;
