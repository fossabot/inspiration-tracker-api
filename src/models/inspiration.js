const mongoose = require('mongoose');

const inspirationSchema = new mongoose.Schema({
  note: {
    type: String
  },
  character: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'Character'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'User'
  }
});

const Inspiration = mongoose.model('Inspiration', inspirationSchema);

module.exports = Inspiration;
