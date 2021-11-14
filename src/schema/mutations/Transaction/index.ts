import { GraphQLFloat, GraphQLID, GraphQLString } from "graphql";
import {
  TransactionType,
  TransactionTypeEnum,
} from "../../typeDefs/Transaction";
import { IAddTransaction, IDeleteTransaction, IEditTransaction } from "./types";
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

export const DELETE_TRANSACTION = {
  type: TransactionType,
  args: {
    auth_token: { type: GraphQLString },
    transaction_id: { type: GraphQLID },
  },
  async resolve(_: any, args: IDeleteTransaction) {
    if (!args.transaction_id || !args.auth_token) {
      throw new Error("Please provide all the required fields");
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

    // check if the transaction belongs to the user
    const transaction = await transactionRepository.findOne({
      id: args.transaction_id,
      user: user,
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const deletedTransaction = await transactionRepository.remove(transaction);

    return deletedTransaction;
  },
};

export const EDIT_TRANSACTION = {
  type: TransactionType,
  args: {
    auth_token: { type: GraphQLString },
    transaction_id: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    with: { type: GraphQLString },
    transaction_type: { type: TransactionTypeEnum },
  },
  async resolve(_: any, args: IEditTransaction) {
    if (!args.transaction_id || !args.auth_token) {
      throw new Error("Please provide all the required fields");
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

    // check if the transaction belongs to the user
    const transaction = await transactionRepository.findOne({
      id: args.transaction_id,
      user: user,
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    if (args.amount) {
      transaction.amount = args.amount;
    }

    if (args.description) {
      transaction.description = args.description;
    }

    if (args.date) {
      transaction.date = args.date;
    }

    if (args.with) {
      transaction.with = args.with;
    }

    if (args.transaction_type) {
      transaction.transaction_type = args.transaction_type;
    }

    const editedTransaction = await transactionRepository.save(transaction);

    return editedTransaction;
  },
};
