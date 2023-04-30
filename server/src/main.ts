import { config } from 'dotenv';
config();
import express from 'express';
import 'reflect-metadata';

import { AppDataSource } from './config/data-source.js';

const app = express();
const PORT = process.env.PORT ?? 4000;

async function start() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
}

start();
