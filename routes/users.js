const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);
router.get('/:userId', usersController.getUserById);
router.post('/', usersController.createUser);

module.exports = router;
