const cardsRoutes = require('express').Router();
const { createCardValidation, cardIdValidation } = require('../middlewares/cardValidation');
const {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getAllCards);
cardsRoutes.delete('/:cardId', cardIdValidation, deleteCard);
cardsRoutes.post('/', createCardValidation, createCard);
cardsRoutes.put('/:cardId/likes', cardIdValidation, likeCard);
cardsRoutes.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardsRoutes;
