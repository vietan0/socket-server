import process from 'node:process';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import type { IncomingMessage } from 'node:http';

const app = express();

morgan.token('params', (req: IncomingMessage & { params: object }) => {
  return JSON.stringify(req.params, null, 2);
});

morgan.token('body', (req: IncomingMessage & { body: object }) => {
  return JSON.stringify(req.body, null, 2);
});

process.env.NODE_ENV !== 'test'
&& app.use([
  morgan('dev'),
  morgan('params: :params \nbody: :body \ncookies: :cookies'),
]); // don't log while testing

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' });
});

export default app;
