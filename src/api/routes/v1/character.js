const router = require('express').Router();
const controller = require('../../controllers/characterController');
const auth = require('../../middleware/auth');

router.post('/', auth, controller.createNew);

router.get('/', auth, controller.findAllSheets);

router.get('/sheet', auth, controller.findSheet);

router.patch('/sheet', auth, controller.updateSheet);

router.delete('/sheet', auth, controller.deleteSheet);

module.exports = router;
