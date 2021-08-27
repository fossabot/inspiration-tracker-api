const express = require('express');
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const characterRouter = require('./routers/character');
const inspirationRouter = require('./routers/inspiration');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/character', characterRouter);
app.use('/inspiration', inspirationRouter);

module.exports = app;
