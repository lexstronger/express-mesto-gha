const router = require('express').Router();
const cardsController = require('../controllers/cards');
const {
  cardIdValidator,
  cardValidator,
} = require('../middlewares/joi');

router.get('/', cardsController.getCards);
router.post('/', cardValidator, cardsController.createCard);
router.delete('/:cardId', cardIdValidator, cardsController.deleteCardById);
router.put('/:cardId/likes', cardIdValidator, cardsController.likeCard);
router.delete('/:cardId/likes', cardIdValidator, cardsController.dislikeCard);

module.exports = router;
