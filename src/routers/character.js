const express = require('express');
const Character = require('../models/character');
const auth = require('../middleware/auth');

const router = new express.Router();

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

router.patch('/', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'campaign'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    const character = await Character.findOne({
      name: new RegExp(`^${req.query.name}$`, 'i'),
      campaign: req.query.campaign,
      owner: req.user._id
    });

    if (!character) {
      return res.status(404).send();
    }

    updates.forEach((update) => (character[update] = req.body[update]));
    await character.save();
    res.send(character);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const character = await Character.find({ owner: req.user._id });

    if (!character) {
      return res.status(404).send();
    }
    res.send(character);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/search', auth, async (req, res) => {
  try {
    const character = await Character.findOne({
      name: new RegExp(`^${req.query.name}$`, 'i'),
      campaign: req.query.campaign,
      owner: req.user._id
    });

    if (!character) {
      return res.status(404).send();
    }
    res.send(character);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const character = await Character.findOneAndDelete({
      name: new RegExp(`^${req.query.name}$`, 'i'),
      campaign: req.query.campaign,
      owner: req.user._id
    });

    if (!character) {
      res.status(404).send();
    }

    res.send(character);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
