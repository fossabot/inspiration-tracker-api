const express = require('express');

const router = new express.Router();

router.get('/hello', (req, res) => {
  res.send('helloInspired');
});

module.exports = router;
