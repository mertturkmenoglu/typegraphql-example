import 'reflect-metadata';

import path from 'path';

import express from 'express';
import dotenv from 'dotenv-safe';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloWorldResolver } from './resolvers/HelloWorldResolver';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { UserResolver } from './resolvers/UserResolver';

dotenv.config();

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, 'migrations')],
    entities: [Post, User],
  });

  await conn.runMigrations();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server started: http://localhost:4000/graphql');
  });
}

main().catch((e) => {
  console.error(e);
});