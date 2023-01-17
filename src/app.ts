import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';

export const app = express()
  .use(cors({ origin: config.ALLOWED_ORIGINS }))
  .use(bodyParser.json())
