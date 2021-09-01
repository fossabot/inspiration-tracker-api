const express = require('express');

const app = express();

app.use(express.json());
app.use('/api/v1', require('./api/routes/v1'));

module.exports = app;
