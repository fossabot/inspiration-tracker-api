const mongoose = require('mongoose');

const inspirationSchema = new mongoose.Schema({
  note: {
    type: String
  },
  givenAt: {
    type: String,
    required: true
  },
  character: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: 'Character'
  }
});

const Inspiration = mongoose.model('Inspiration', inspirationSchema);

module.exports = Inspiration;
