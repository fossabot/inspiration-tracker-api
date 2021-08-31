const express = require('express');

const app = express();

app.use(express.json());
require('./api/routes')(app);

module.exports = app;
