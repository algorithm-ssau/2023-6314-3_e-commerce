import express from 'express';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT ?? 4000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
}

start();
