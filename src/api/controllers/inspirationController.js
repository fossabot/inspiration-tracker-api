const Character = require('../../models/character');
const Inspiration = require('../../models/inspiration');

const grantInspiration = async (req, res) => {
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
      character: character._id,
      owner: req.user._id
    });

    await inspiration.save();
    await res.status(201).send(inspiration);
  } catch (e) {
    res.status(400).send(e);
  }
};

const findInspiration = async (req, res) => {
  try {
    const character = await Character.findOne({
      name: new RegExp(`^${req.query.name}$`, 'i'),
      campaign: req.query.campaign,
      owner: req.user._id
    });

    if (!character) {
      res.status(404).send();
    }

    const inspiration = await Inspiration.find({ character: character._id });
    await res.send(inspiration);
  } catch (e) {
    res.status(500).send();
  }
};

const updateInspiration = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['note'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    const inspiration = await Inspiration.findById(req.params.id);

    if (!inspiration) {
      return res.status(404).send();
    }

    updates.forEach((update) => (inspiration[update] = req.body[update]));
    await inspiration.save();
    res.send(inspiration);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteInspiration = async (req, res) => {
  try {
    const inspiration = await Inspiration.findByIdAndDelete(req.params.id);
    res.send(inspiration);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = { grantInspiration, findInspiration, updateInspiration, deleteInspiration };
