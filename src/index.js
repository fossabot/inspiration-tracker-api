const app = require('./app');
const connectMongo = require('./db/connect');

const port = process.env.PORT;

connectMongo().then(() => {
  app.listen(port, () => {
    console.log(`Application is listening on ${port}`);
  });
});
