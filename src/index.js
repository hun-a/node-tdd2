import express from 'express';
import morgan from 'morgan';

const app = express();

const users = [
  {id: 1, name: 'alice'},
  {id: 2, name: 'bek'},
  {id: 3, name: 'chris'}
];

app.use(morgan('dev'));

app.get('/users', (req, res) => {
  const limit = req.query.limit;
  res.json(users.slice(0, limit));
});

export default app;