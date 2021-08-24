const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true
    },
    campaign: {
      type: String,
      require: true,
      trim: true
    },
    inspirations: [
      {
        givenAt: {
          type: Date,
          require: true
        },
        note: {
          type: String,
          trim: true
        }
      }
    ],
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

characterSchema.statics.findByName = async (name) => {
  const character = await Character.findOne({ name });

  if (!character) {
    throw new Error('Unable to find character');
  }

  return character;
};

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;