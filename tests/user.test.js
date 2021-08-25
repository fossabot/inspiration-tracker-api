const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const Character = require('../src/models/character');
const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

describe('User profile information', () => {
  beforeEach(setupDatabase);

  test('Should get profile for user', async () => {
    await request(app)
      .get('/user/profile')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

  test('Should update valid user fields', async () => {
    await request(app)
      .patch('/user/profile')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: 'Jane Doe'
      })
      .expect(200);

    const user = await User.findById(userOneId);
    expect(user.name).toBe('Jane Doe');
  });

  test('Should not update invalid user fields', async () => {
    await request(app)
      .patch('/user/profile')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        character: 'character name'
      })
      .expect(400);
  });

  test('Should not update a user if unauthenticated', async () => {
    await request(app)
      .patch('/user/profile')
      .send({
        name: 'Jane Doe'
      })
      .expect(401);
  });

  test('Should not update user with invalid name', async () => {
    await request(app)
      .patch('/user/profile')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: null
      })
      .expect(400);
  });

  test('Should not update user with invalid email', async () => {
    await request(app)
      .patch('/user/profile')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        email: 'testuseratexample.com'
      })
      .expect(400);
  });

  test('Should not update user with invalid password', async () => {
    await request(app)
      .patch('/user/profile')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        password: 'password'
      })
      .expect(400);
  });
});

describe('Delete user data', () => {
  beforeEach(setupDatabase);

  test('Should delete the user account', async () => {
    await request(app).delete('/user').set('Authorization', `Bearer ${userOne.tokens[0].token}`).send().expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
    const characters = await Character.find({ owner: userOneId });
    expect(characters).toHaveLength(0);
  });

  test('Should not delete an unauthenticated user', async () => {
    await request(app).delete('/user').send().expect(401);
  });
});
