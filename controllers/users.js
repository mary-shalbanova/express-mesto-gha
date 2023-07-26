const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
} = require('../utils/constants');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(STATUS_CODE_OK).send(users);
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким _id');
    }
    res.status(STATUS_CODE_OK).send(user);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(STATUS_CODE_OK).send(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(STATUS_CODE_CREATED).send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
    }

    next(err);
  }
};

const updateUser = async (data, req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    res.status(STATUS_CODE_OK).send(user);
  } catch (err) {
    next(err);
  }
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  updateUser({ name, about }, req, res);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser({ avatar }, req, res);
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильный логин или пароль');
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new UnauthorizedError('Неправильный логин или пароль');
    }

    const token = jwt.sign({ _id: user._id }, 'secret-key', {
      expiresIn: '7d',
    });

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({ _id: user._id });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
  login,
};
