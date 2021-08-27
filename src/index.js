const app = require('./app');
const db = require('./db/connect');

const port = process.env.PORT;

db.connectMongo().then(() => {
  app.listen(port, () => {
    console.log(`Application is listening on ${port}`);
  });
});
