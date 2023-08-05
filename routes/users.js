const usersRoutes = require('express').Router();
const { updateUserAvatarValidation, updateUserInfoValidation, getUserByIdValidation } = require('../middlewares/userValidation');

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
usersRoutes.patch('/me', updateUserInfoValidation, updateUserInfo);
usersRoutes.patch('/me/avatar', updateUserAvatarValidation, updateAvatar);

module.exports = usersRoutes;
