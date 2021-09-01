const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Character = require('../../src/models/character');
const Inspiration = require('../../src/models/inspiration');

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

const userThreeId = new mongoose.Types.ObjectId();
const userThree = {
  _id: userThreeId,
  name: 'Jack Doe',
  email: 'Jack@example.com',
  password: 'testwhat53!',
  tokens: [
    {
      token: jwt.sign({ _id: userThreeId }, process.env.JWT_SECRET)
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

const inspirationOne = {
  _id: new mongoose.Types.ObjectId(),
  note: 'Inspiration from when the thing was being tested that one time.',
  character: characterOne._id,
  owner: userOneId
};

const inspirationTwo = {
  _id: new mongoose.Types.ObjectId(),
  note: 'Inspiration from when the thing was being tested that one time but you know, it is for the second one.',
  character: characterOne._id,
  owner: userOneId
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Character.deleteMany();
  await Inspiration.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new User(userThree).save();
  await new Character(characterOne).save();
  await new Character(characterTwo).save();
  await new Character(characterThree).save();
  await new Inspiration(inspirationOne).save();
  await new Inspiration(inspirationTwo).save();
};

const disconnectMongo = async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  userThree,
  characterOne,
  characterTwo,
  inspirationOne,
  inspirationTwo,
  setupDatabase,
  disconnectMongo
};
