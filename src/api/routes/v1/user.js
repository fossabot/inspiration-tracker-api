const router = require('express').Router();
const controller = require('../../controllers/userController');
const auth = require('../../middleware/auth');

router.get('/profile', auth, controller.getProfile);

router.patch('/profile', auth, controller.updateProfile);

router.delete('/', auth, controller.deleteProfile);

module.exports = router;
