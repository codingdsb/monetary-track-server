import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { PORT, __prod__ } from "./constants";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import playGround from "graphql-playground-middleware-express";
import User from "./entities/User";
import { Transaction } from "./entities/Transaction";

const main = async () => {
  await createConnection({
    type: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Transaction],
    logging: !__prod__,
  });

  const app = express();
  app.use(cors());

  // graphql middleware
  app.use(
    "/gql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.get("/", playGround({ endpoint: "/gql" }));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});