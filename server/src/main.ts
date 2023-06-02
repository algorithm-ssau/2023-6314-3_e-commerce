import { config } from 'dotenv';
config();
import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';

import { AppDataSource } from './config/data-source.js';
import corsOptions from './config/corsOptions.js';
import cors from 'cors';
import userRouter from './routers/user-router.js';
import errorHandler from './middlewares/errorHandler.js';
import productRouter from './routers/product-router.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html')));

app.use(errorHandler);

async function start() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
}

start();
