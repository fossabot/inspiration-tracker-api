const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    require: true,
    unique: true,
    trim: true
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);
