const mongoose = require('mongoose');

const connectMongo = async () => {
  try {
    console.log('Starting MongoDB.');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB.');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectMongo;
