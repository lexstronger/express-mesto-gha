const router = require('express').Router();
const usersController = require('../controllers/users');
const {
  userByIdValidator,
  profileInfoValidator,
  avatarValidator,
} = require('../middlewares/joi');

router.get('/', usersController.getUsers);
router.get('/me', usersController.getProfileInfo);
router.get('/:userId', userByIdValidator, usersController.getUserById);
router.patch('/me', profileInfoValidator, usersController.updateProfile);
router.patch('/me/avatar', avatarValidator, usersController.updateAvatar);

module.exports = router;
