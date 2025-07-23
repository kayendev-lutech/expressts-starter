import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  dbHost,
  dbPort,
  dbName,
  dbUser,
  dbPassword,
} from '../constants/env.constants.js';

// import { User } from '../module/user/entity/user.entity.js';
// import { Token } from '../module/token/entity/token.entity.js';
// import { Product } from '../module/product/entity/product.entity.js';
// import { Category } from '../module/category/entity/category.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  entities: ['src/module/**/entity/*.entity.{ts,js}'],
  migrations: ['src/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});