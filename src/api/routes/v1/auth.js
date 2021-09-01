const router = require('express').Router();
const controller = require('../../controllers/authController');
const auth = require('../../middleware/auth');

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

router.post('/logout', auth, controller.logoutUser);

router.post('/logoutAll', auth, controller.logoutAllSessions);

module.exports = router;
