const mongoose = require('mongoose');

const connectMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((res, err) => {
        if (err) return reject(err);
        resolve(console.log('Connected to MongoDB.'));
      });
  });
};

const disconnectMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose.disconnect().then((res, err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
module.exports = { connectMongo, disconnectMongo };
