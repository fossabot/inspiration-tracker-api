const app = require('./app');
const db = require('./db/connect');

const port = process.env.PORT;

db.connectMongo()
  .then((dbStatus) => {
    app.listen(port, () => {
      console.log(dbStatus);
      console.log(`Application is listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
