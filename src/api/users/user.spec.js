
import app from '../../';
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

  describe('fail ', () => {
    test('when id is not a number then returns 400 error code', done => {
      request(app)
        .delete('/users/one')
        .expect(400)
        .end(done);
    });
  });
});

describe('POST /users will be ', () => {
  describe('success ', () => {
    let body;
    const newUser = {name: 'daniel'};
    beforeAll(done => {
      request(app)
        .post('/users')
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    test('when returns new created user', () => {
      expect(body).toHaveProperty('id');
    });
    test('when returns name of new created user', () => {
      expect(body).toHaveProperty('name', newUser.name);
    });
  });

  describe('fail ', () => {
    test('if there are no params then returns 400 error code', done => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done);
    });

    test('if there are duplicated names then returns 409 error code', done => {
      request(app)
        .post('/users')
        .send({name: 'daniel'})
        .expect(409)
        .end(done);
    });
  });
});

describe('PUT /users/:id will be ', () => {
  describe('success ', () => {
    test('when response updated name', done => {
      const name = 'den';
      request(app)
        .put('/users/3')
        .send({name})
        .end((err, res) => {
          expect(res.body).toHaveProperty('name', name);
          done();
        });
    });
  });

  describe('fail ', () => {
    test('when id is not a number then returns 400 error code', done => {
      request(app)
        .put('/users/one')
        .expect(400)
        .end(done);
    });

    test('when name is not exists then returns 400 error code', done => {
      request(app)
        .put('/users/3')
        .send({})
        .expect(400)
        .end(done);
    });

    test('when there are no matched user then returns 400 error code', done => {
      request(app)
        .put('/users/999')
        .send({name: 'foo'})
        .expect(404)
        .end(done);
    });

    test('when name is duplicated then returns 409 error code', done => {
      request(app)
        .put('/users/3')
        .send({name: 'bek'})
        .expect(409)
        .end(done);
    });
  });
});