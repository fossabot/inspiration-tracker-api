const app = require('./app');
const db = require('./db/connect');

const port = process.env.PORT;

(async () => {
  try {
    await db.connectMongo();

    app.listen(port, () => {
      console.log(`Application is listening on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
