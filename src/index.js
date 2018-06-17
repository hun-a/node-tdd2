import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

const users = [
  {id: 1, name: 'alice'},
  {id: 2, name: 'bek'},
  {id: 3, name: 'chris'}
];

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || users.length;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const user = users.filter(user => user.id === id)[0];
  if (!user) {
    return res.status(404).end();
  }
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const index = users.findIndex(user => user.id === id);
  const isDelete = users.splice(index, 1);
  if (!!isDelete.length) {
    return res.status(204).end();
  }
});

app.post('/users', (req, res) => {
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  const isConflict = users.filter(user => user.name === name).length;
  if (isConflict) {
    return res.status(409).end();
  }

  const id = new Date().getTime();
  const user = {id, name};
  users.push(user);
  res.status(201).json(user).end();
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }
  const user = users.filter(user => user.id === id)[0];
  if (!user) {
    return res.status(404).end();
  }
  const isConflict = users.filter(user => user.name === name).length;
  if (isConflict) {
    return res.status(409).end();
  }
  user.name = name;
  res.json(user).end();
});

export default app;