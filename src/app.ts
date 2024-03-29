import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import { UnprotectedControllers } from './context';
import { httpErrorHandler } from './error/http.error.handler';

export const app = express()
  .use(cors({ origin: config.ALLOWED_ORIGINS }))
  .use(bodyParser.json())
  .use("/", UnprotectedControllers)
  .use(httpErrorHandler)
