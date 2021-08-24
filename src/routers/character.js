const express = require('express');
const Character = require('../models/character');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/hello', (req, res) => {
  res.send('helloCharacter');
});

router.post('/', auth, async (req, res) => {
  const character = new Character({
    ...req.body,
    owner: req.user._id
  });
  try {
    await character.save();
    res.status(201).send(character);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/:name', auth, async (req, res) => {
  try {
    const character = await Character.findOne({ name: new RegExp(`^${req.params.name}$`, 'i'), owner: req.user._id });

    if (!character) {
      return res.status(404).send();
    }
    res.send(character);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
