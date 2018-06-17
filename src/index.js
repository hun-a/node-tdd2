import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import users from './api/users';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', users);

export default app;