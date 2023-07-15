const { CastError, ValidationError } = require('mongoose').Error;
const User = require('../models/user');

const {
  ERROR_CODE_OK,
  ERROR_CODE_CREATED,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(ERROR_CODE_OK).send(users);
  } catch (err) {
    res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user === null) {
      res.status(ERROR_CODE_NOT_FOUND).send({
        message: 'Пользователь по указанному _id не найден',
      });
    } else {
      res.status(ERROR_CODE_OK).send(user);
    }
  } catch (err) {
    if (err instanceof CastError) {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: 'Передан некорректный _id пользователя',
      });
      return;
    }

    res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(ERROR_CODE_CREATED).send(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: 'Переданы некорректные данные при создании пользователя',
      });
      return;
    }

    res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(ERROR_CODE_OK).send(user);
  } catch (err) {
    if (err instanceof CastError) {
      res.status(ERROR_CODE_NOT_FOUND).send({
        message: 'Пользователь по указанному _id не найден',
      });
      return;
    }

    if (err instanceof ValidationError) {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: 'Переданы некорректные данные при создании пользователя',
      });
      return;
    }

    res.status(500).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );
    res.status(ERROR_CODE_OK).send(user);
  } catch (err) {
    if (err instanceof CastError) {
      res.status(ERROR_CODE_NOT_FOUND).send({
        message: 'Пользователь по указанному _id не найден',
      });
      return;
    }

    if (err instanceof ValidationError) {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: 'Переданы некорректные данные при создании пользователя',
      });
      return;
    }

    res.status(500).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateAvatar,
};
