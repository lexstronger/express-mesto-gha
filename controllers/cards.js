const Card = require('../models/card');
const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(CREATED).send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные', error: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные', error: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при постановке лайка', error: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при снятии лайка', error: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
};
