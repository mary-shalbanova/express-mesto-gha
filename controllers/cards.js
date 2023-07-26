const { CastError } = require('mongoose').Error;
const Card = require('../models/card');

const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/constants');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getAllCards = async (req, res, next) => {
  try {
    const cardList = await Card.find({});
    res.status(STATUS_CODE_OK).send(cardList);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Передан неcуществующий _id карточки');
    }

    if (card.owner.toString() === req.user._id) {
      await Card.deleteOne({ _id: req.params.cardId });
      res.status(STATUS_CODE_OK).send({
        message: 'Карточка удалена',
      });
    } else {
      throw new ForbiddenError('Нет прав для удаления выбранной карточки');
    }
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Передан некорректный _id карточки'));
    }

    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(STATUS_CODE_CREATED).send(card);
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан неcуществующий _id карточки');
    }
    res.status(STATUS_CODE_OK).send(card);
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Передан некорректный _id карточки'));
    }

    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан неcуществующий _id карточки');
    }
    res.status(STATUS_CODE_OK).send(card);
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError('Передан некорректный _id карточки'));
    }

    next(err);
  }
};

module.exports = {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
