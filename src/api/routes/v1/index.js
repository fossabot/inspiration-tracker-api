const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const characterRouter = require('./character');
const inspirationRouter = require('./inspiration');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/character', characterRouter);
router.use('/inspiration', inspirationRouter);

module.exports = router;
