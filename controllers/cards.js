const { CastError, ValidationError } = require('mongoose').Error;
const Card = require('../models/card');

const {
  ERROR_CODE_OK,
  ERROR_CODE_CREATED,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');

const getAllCards = async (req, res) => {
  try {
    const cardList = await Card.find({});
    res.status(ERROR_CODE_OK).send(cardList);
  } catch (err) {
    res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndRemove(req.params.cardId);
    res.status(ERROR_CODE_OK).send({
      message: 'Карточка удалена',
    });
  } catch (err) {
    if (err instanceof CastError) {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: 'Карточка с указанным _id не найдена',
      });
      return;
    }

    res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(ERROR_CODE_CREATED).send(card);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: 'Переданы некорректные данные при создании карточки',
      });
      return;
    }

    res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    res.status(ERROR_CODE_OK).send(card);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: 'Переданы некорректные данные для постановки лайка',
      });
      return;
    }

    if (err instanceof CastError) {
      res.status(ERROR_CODE_NOT_FOUND).send({
        message: 'Передан несуществующий _id карточки',
      });
      return;
    }

    res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    res.status(ERROR_CODE_OK).send(card);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(ERROR_CODE_BAD_REQUEST).send({
        message: 'Переданы некорректные данные для снятия лайка',
      });
      return;
    }

    if (err instanceof CastError) {
      res.status(ERROR_CODE_NOT_FOUND).send({
        message: 'Передан несуществующий _id карточки',
      });
      return;
    }

    res.status(ERROR_CODE_INTERNAL_SERVER_ERROR).send({
      message: 'На сервере произошла ошибка',
    });
  }
};

module.exports = {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};