const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NOT_FOUND } = require('../utils/constants');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  signinValidator,
  signupValidator,
} = require('../middlewares/joi');

router.post('/signin', signinValidator, login);
router.post('/signup', signupValidator, createUser);
router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});

module.exports = router;
