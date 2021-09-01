const router = require('express').Router();
const controller = require('../../controllers/inspirationController');
const auth = require('../../middleware/auth');

router.post('/', auth, controller.grantInspiration);

router.get('/', auth, controller.findInspiration);

router.patch('/:id', auth, controller.updateInspiration);

router.delete('/:id', auth, controller.deleteInspiration);

module.exports = router;
