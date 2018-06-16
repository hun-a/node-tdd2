
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
  });
});