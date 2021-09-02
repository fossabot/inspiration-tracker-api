const request = require('supertest');
const app = require('a../../../src/app');
const connectMongo = require('../../../../src/db/connect');
const Character = require('../../../../src/models/character');
const {
  userOne,
  userTwo,
  userThree,
  characterOne,
  characterTwo,
  setupDatabase,
  disconnectMongo
} = require('../../../fixtures/db');

beforeAll((done) => {
  connectMongo();
  done();
});

afterAll((done) => {
  disconnectMongo();
  done();
});

describe('Creating a character', () => {
  beforeEach(setupDatabase);

  test('Should create character for an authenticated user', async () => {
    const response = await request(app)
      .post('/api/v1/character')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: 'Post Test',
        campaign: 'Post Campaign'
      })
      .expect(201);

    const character = await Character.findById(response.body._id);
    expect(character).not.toBeNull();
  });

  test('Should not create character for an unauthenticated user', async () => {
    await request(app)
      .post('/api/v1/character')
      .send({
        name: 'Post Test',
        campaign: 'Post Campaign'
      })
      .expect(401);
  });
});

describe('Updating a character', () => {
  beforeEach(setupDatabase);
  test('Should update a character for an authenticated user', async () => {
    const response = await request(app)
      .patch(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: 'Testing the name change'
      })
      .expect(200);
    const character = await Character.findById(characterOne._id);
    expect(character.name).toBe(response.body.name);
  });

  test('Should not update a character with invalid properties', async () => {
    await request(app)
      .patch(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        charName: 'Testing the name change'
      })
      .expect(400);
  });

  test('Should not update a character for the wrong user', async () => {
    await request(app)
      .patch(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send({
        name: 'Testing the name change'
      })
      .expect(404);
    const character = await Character.findById(characterOne._id);
    expect(character.name).toBe(characterOne.name);
  });

  test('Should not update a character for an unauthenticated user', async () => {
    await request(app)
      .patch(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .send({
        name: 'Testing the name change'
      })
      .expect(401);
    const character = await Character.findById(characterOne._id);
    expect(character.name).toBe(characterOne.name);
  });
});

describe('Searching for characters', () => {
  beforeEach(setupDatabase);

  test('Should return all characters for an authenticated user', async () => {
    const response = await request(app)
      .get('/api/v1/character')
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(200);

    expect(response.body.characters).toHaveLength(2);
  });

  test('Should return all characters for an authenticated user', async () => {
    await request(app)
      .get('/api/v1/character')
      .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
      .send()
      .expect(404);
  });

  test('Should not return all characters for an unauthenticated user', async () => {
    await request(app).get('/api/v1/character').send().expect(401);
  });

  test('Should return a single character for an authenticated user', async () => {
    await request(app)
      .get(`/api/v1/character/sheet?name=${characterTwo.name}&campaign=${characterTwo.campaign}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(200);

    const character = await Character.findById({ _id: characterTwo._id });
    expect(character.name).toBe(characterTwo.name);
  });

  test('Should not return a character for the wrong user', async () => {
    await request(app)
      .get(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(404);
  });

  test('Should not return a single character for an unauthenticated user', async () => {
    await request(app)
      .get(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .send()
      .expect(401);
  });
});

describe('Deleting characters', () => {
  beforeEach(setupDatabase);

  test('Should delete a single character for an authenticated user', async () => {
    const response = await request(app)
      .delete(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    const character = Character.findById({ _id: response._id });
    expect(character).toBeNull;
  });

  test('Should not delete a single character for the wrong user', async () => {
    await request(app)
      .delete(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send()
      .expect(404);
  });

  test('Should not delete a single character for an unauthenticated user', async () => {
    await request(app)
      .delete(`/api/v1/character/sheet?name=${characterOne.name}&campaign=${characterOne.campaign}`)
      .send()
      .expect(401);
  });
});
