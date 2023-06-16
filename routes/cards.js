const router = require('express').Router();
const cardsController = require('../controllers/cards');

router.get('/', cardsController.getCards);
router.post('/', cardsController.createCard);
router.delete('/:cardId', cardsController.deleteCardById);

module.exports = router;
