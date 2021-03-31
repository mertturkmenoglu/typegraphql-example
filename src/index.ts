import 'reflect-metadata';

import express from 'express';

const main = async () => {
  const app = express();

  app.listen(4000, () => {
    console.log('Server started: http://localhost:4000/graphql');
  });
}

main().catch((e) => {
  console.error(e);
});