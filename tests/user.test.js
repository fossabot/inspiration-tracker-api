const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

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

  //Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Test User',
      email: 'test-user@example.com'
    },
    token: user.tokens[0].token
  });
  expect(user.password).not.toBe('TestPass4512!');
});
