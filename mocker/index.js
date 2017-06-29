import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import createArticleRouter from './article';
import createAuthRouter from './auth';
import createUserRouter from './user';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

const router = new Router();
createArticleRouter(router);
createAuthRouter(router);
createUserRouter(router);

app.use(router);

app.listen(9001, () => {
  // eslint-disable-next-line no-console
  console.log('Mock server is running on port 9001');
});
