const express = require('express');
const { DateTime } = require('luxon');
const Character = require('../models/character');
const Inspiration = require('../models/inspiration');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const character = await Character.findOne({
      name: new RegExp(`^${req.query.name}$`, 'i'),
      campaign: req.query.campaign,
      owner: req.user._id
    });

    if (!character) {
      return res.status(404).send();
    }

    const inspiration = await new Inspiration({
      ...req.body,
      givenAt: DateTime.now(),
      character: character._id
    });

    await inspiration.save();
    await res.send(inspiration);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['note'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    const inspiration = await Inspiration.findById(inspiration._id);

    if (!inspiration) {
      return res.status(404).send();
    }

    updates.forEach((update) => (inspiration[update] = req.body[update]));
    await inspiration.save();
    res.send(inspiration);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id'),
  auth,
  async (req, res) => {
    try {
      const inspiration = await Inspiration.findByIdAndDelete(req.params._id);
      res.send(inspiration);
    } catch (e) {
      res.status(500).send();
    }
  };
module.exports = router;
