import { GraphQLFloat, GraphQLString } from "graphql";
import {
  TransactionType,
  TransactionTypeEnum,
} from "../../typeDefs/Transaction";
import { IAddTransaction } from "./types";
import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../../../constants";
import Transaction from "../../../entities/Transaction";
import User from "../../../entities/User";
import { getRepository } from "typeorm";

export const ADD_TRANSACTION = {
  type: TransactionType,
  args: {
    auth_token: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    with: { type: GraphQLString },
    transaction_type: { type: TransactionTypeEnum },
  },
  async resolve(_: any, args: IAddTransaction) {
    if (
      !args.auth_token ||
      !args.amount ||
      !args.description ||
      !args.date ||
      !args.with ||
      !args.transaction_type
    ) {
      throw new Error("All fields are required");
    }

    const userRepository = getRepository(User);
    const transactionRepository = getRepository(Transaction);

    const decoded = jwt.verify(args.auth_token, JWT_SECRET as Secret);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    const { id } = decoded as { id: string };

    const user = await userRepository.findOne({ id });

    if (!user) {
      throw new Error("User not found");
    }
    const transaction = new Transaction();
    transaction.amount = args.amount;
    transaction.description = args.description;
    transaction.date = args.date;
    transaction.with = args.with;
    transaction.transaction_type = args.transaction_type;
    transaction.user = user;
    await transactionRepository.save(transaction);

    return transaction;
  },
};
