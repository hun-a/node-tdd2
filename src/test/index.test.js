
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