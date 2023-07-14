const cardsRoutes = require('express').Router();
const {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRoutes.get('/', getAllCards);
cardsRoutes.delete('/:cardId', deleteCard);
cardsRoutes.post('/', createCard);
cardsRoutes.put('/:cardId/likes', likeCard);
cardsRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRoutes;
