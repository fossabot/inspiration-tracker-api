const mongoose = require('mongoose');
const Inspiration = require('./inspiration');

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    campaign: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

characterSchema.virtual('inspirations', {
  ref: 'Inspiration',
  localField: '_id',
  foreignField: 'character'
});

characterSchema.pre('remove', async function (next) {
  await Inspiration.deleteMany({ character: this._id });
  next();
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
