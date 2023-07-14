const usersRoutes = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
} = require('../controllers/users');

usersRoutes.get('/', getAllUsers);
usersRoutes.get('/:userId', getUserById);
usersRoutes.post('/', createUser);
usersRoutes.patch('/me', updateUserInfo);
usersRoutes.patch('/me/avatar', updateAvatar);

module.exports = usersRoutes;
