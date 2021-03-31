import 'reflect-metadata';

import path from 'path';

import express from 'express';
import dotenv from 'dotenv-safe';
import { createConnection } from 'typeorm';

dotenv.config();

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: [path.join(__dirname, 'migrations')],
    entities: [],
  });

  await conn.runMigrations();

  const app = express();

  app.listen(4000, () => {
    console.log('Server started: http://localhost:4000/graphql');
  });
}

main().catch((e) => {
  console.error(e);
});