const usersRoutes = require('express').Router();
const { updateUserValidation, getUserByIdValidation } = require('../middlewares/userValidation');

const {
  getAllUsers,
  getUserById,
  updateUserInfo,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/me', getCurrentUser);
usersRoutes.get('/:userId', getUserByIdValidation, getUserById);
usersRoutes.patch('/me', updateUserValidation, updateUserInfo);
usersRoutes.patch('/me/avatar', updateUserValidation, updateAvatar);

module.exports = usersRoutes;
