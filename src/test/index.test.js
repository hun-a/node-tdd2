
import app from '../index';
import request from 'supertest';

describe('GET /users will be ', () => {
  describe('success ', () => {
    test('when responding to an array containing user objects', done => {
      request(app)
        .get('/users')
        .end((err, res) => {
          expect(res.body).toBeInstanceOf(Array);
          done();
        });
    });

    test('when It responds by the maximum limit number.', done => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          expect(res.body).toHaveLength(2);
          done();
      });
    });
  });

  describe('fail ', () => {
    test('if limit is not a number type then respons 400 error code', done => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done);
    });
  });
});

describe('GET /users/:id will be ', () => {
  describe('success ', () => {
    test('when returns user who have id as 1', done => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          const user = res.body;
          expect(user).toHaveProperty('id', 1);
          done();
        });
    });
  });

  describe('fail ', () => {
    test('if id is not a number then respons 400 error code', done => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done);
    });

    test(`when couldn't find user by id then returns 404 error code`, done => {
      request(app)
        .get('/users/4')
        .expect(404)
        .end(done);
    });
  });
});

describe('DELETE /users/:id will be ', () => {
  describe('success ', () => {
    test('then returns 204 status code', done => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end(done);
    });
  });
});