import { DataSource } from 'typeorm';
import { User } from '../models/auth/User.js';
import { Role } from '../models/auth/Role.js';
import { Token } from '../models/auth/Token.js';
import { Product } from '../models/Product/Product.js';
import { ProductCategory } from '../models/Product/ProductCategory.js';
import { AddedToCartProduct } from '../models/Product/AddedToCartProduct.js';
import { FavoriteProduct } from '../models/Product/FavoriteProduct.js';
import { PurchasedProduct } from '../models/Product/PurchasedProduct.js';

import { config } from 'dotenv';
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DATABASE_PORT ?? 5432),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Role, Token, Product, ProductCategory, AddedToCartProduct, FavoriteProduct, PurchasedProduct],
});
