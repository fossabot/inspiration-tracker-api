const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db/connect');
const Inspiration = require('../src/models/inspiration');
const {
  userOne,
  userTwo,
  userTwoId,
  characterOne,
  characterTwo,
  inspirationOne,
  setupDatabase
} = require('./fixtures/db');

beforeAll((done) => {
  db.connectMongo();
  done();
});

afterAll((done) => {
  db.disconnectMongo();
  done();
});

describe('Adding inspiration to a character', () => {
  beforeEach(setupDatabase);
  test('Granting inspiration to a character of an authenticated user', async () => {
    const response = await request(app)
      .post(`/inspiration?name=${characterTwo.name}&campaign=${characterTwo.campaign}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send({
        note: 'granting inspiration to a character as a test!'
      })
      .expect(201);

    const inspiration = await Inspiration.findById(response.body._id);
    expect(inspiration.character).toStrictEqual(characterTwo._id);
    expect(inspiration.owner).toStrictEqual(userTwoId);
  });

  test('Should not grant inspiration to a character that the user does not own', async () => {
    await request(app)
      .post(`/inspiration?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send({
        note: 'granting inspiration to a character as a test!'
      })
      .expect(404);
  });

  test('Should not grant inspiration to a character from an unauthenticated user', async () => {
    await request(app)
      .post(`/inspiration?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .send({
        note: 'granting inspiration to a character as a test!'
      })
      .expect(401);
  });
});

describe('Updating notes on the inspiration object', () => {
  test('Should update the note field on the inspiration', async () => {
    const response = await request(app)
      .patch(`/inspiration/${inspirationOne._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        note: 'This is an updated note'
      });
    expect(200);
    const inspiration = await Inspiration.findById(response.body._id);

    expect(inspiration.note).toBe(response.body.note);
  });

  test('Should not update inspiration with invalid fields ', async () => {
    await request(app)
      .patch(`/inspiration/${inspirationOne._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        inspNote: 'This is an updated note'
      });
    expect(400);
  });

  test('Should not update inspiration from an unauthenticated user', async () => {
    const response = await request(app).patch(`/inspiration/${inspirationOne._id}`).send({
      note: 'This is an updated note'
    });
    expect(401);
  });
});

describe('Removing inspirations from the character', () => {
  test('Should remove inspiration from a character', async () => {
    const response = await request(app)
      .delete(`/inspiration/${inspirationOne._id}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send();
    expect(200);

    const inspiration = Inspiration.findById({ _id: response._id });
    expect(inspiration).toBeNull;
  });
});
