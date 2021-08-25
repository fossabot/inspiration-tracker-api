const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Character = require('../../src/models/character');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'John Doe',
  email: 'john@example.com',
  password: 'testwhat51!',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'James Doe',
  email: 'James@example.com',
  password: 'testwhat52!',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }
  ]
};

const characterOne = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Test Character',
  campaign: 'Test Campaign',
  owner: userOneId
};

const characterTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Character Test',
  campaign: 'Test Campaign',
  owner: userTwoId
};

const characterThree = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Character Test 2',
  campaign: 'Test Campaign',
  owner: userTwoId
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Character.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Character(characterOne).save();
  await new Character(characterTwo).save();
  await new Character(characterThree).save();
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  characterOne,
  characterTwo,
  setupDatabase
};
