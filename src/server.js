const app = require('./app');
const connectMongo = require('./db/connect');

const port = process.env.PORT;

(async () => {
  try {
    await connectMongo();

    app.listen(port, () => {
      console.log(`Application is listening on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
