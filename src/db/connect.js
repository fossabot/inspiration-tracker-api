const mongoose = require('mongoose');

const connectMongo = () => {
  return new Promise((resolve, reject) => {
    try {
      mongoose
        .connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
          resolve('Connected to MongoDB.');
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

const disconnectMongo = () => {
  return new Promise((resolve, reject) => {
    try {
      mongoose
        .disconnect()
        .then(() => {
          resolve('Disconnected from MongoDB.');
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = { connectMongo, disconnectMongo };
