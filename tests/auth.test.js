const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db/connect');
const User = require('../src/models/user');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

beforeAll((done) => {
  db.connectMongo();
  done();
});

afterAll((done) => {
  db.disconnectMongo();
  done();
});

describe('Registering a new user', () => {
  beforeEach(setupDatabase);

  test('Should signup a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test-user@example.com',
        password: 'TestPass4512!'
      })
      .expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
      user: {
        name: 'Test User',
        email: 'test-user@example.com'
      },
      token: user.tokens[0].token
    });
    expect(user.password).not.toBe('TestPass4512!');
  });

  test('Should not signup user with invalid name', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        name: null,
        password: 'SuperSecureTestP@ss',
        email: 'testuser@example.com'
      })
      .expect(400);
  });

  test('Should not signup user with invalid email', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        password: 'SuperSecureTestP@ss',
        email: 'testuseratexample.com'
      })
      .expect(400);
  });

  test('Should not signup user with invalid password', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        password: 'password',
        email: 'testuser@example.com'
      })
      .expect(400);
  });
});

describe('Authentication endpoints', () => {
  beforeEach(setupDatabase);

  test('Should login existing user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: userOne.email,
        password: userOne.password
      })
      .expect(200);

    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
  });

  test('Should not login nonexistent user', async () => {
    await request(app)
      .post('/auth/login')
      .send({
        email: 'fakeuser@example.net',
        password: 'badpass123'
      })
      .expect(400);
  });

  test('Should logout existing user', async () => {
    await request(app)
      .post('/auth/logout')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    const user = await User.findById(userOneId);
    expect(user.tokens).toHaveLength(0);
  });

  test('Should logout all user sessions for existing user', async () => {
    await request(app)
      .post('/auth/logoutAll')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);

    const user = await User.findById(userOneId);
    expect(user.tokens).toHaveLength(0);
  });
});
