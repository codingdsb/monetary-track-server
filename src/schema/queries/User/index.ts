import { GraphQLString } from "graphql";
import { AuthPayloadType } from "../../typeDefs/AuthPayload";
import { IGetUserDetailsById, ILogin } from "./types";
import bcrypt from "bcryptjs";
import User from "../../../entities/User";
import Transaction from "../../../entities/Transaction";
import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../../../constants";
import { getRepository } from "typeorm";
import { UserType } from "../../typeDefs/User";

export const LOGIN = {
  type: AuthPayloadType,
  args: {
    username_or_email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_: any, args: ILogin) {
    if (!args.username_or_email || !args.password) {
      throw new Error("Please provide username/email and password");
    }

    let user;
    const userRepository = getRepository(User);
    // check user by username
    user = await userRepository.findOne({ username: args.username_or_email });

    if (!user) {
      // check user by email
      user = await userRepository.findOne({ email: args.username_or_email });

      if (!user) {
        throw new Error("User not found with username/email");
      }
    }

    const isValidPassword = await bcrypt.compare(args.password, user.password);
    if (!isValidPassword) {
      throw new Error("Password is not correct");
    }

    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find({ user });

    const token = jwt.sign({ id: user.id }, JWT_SECRET as Secret);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        transactions,
      },
    };
  },
};

export const GET_USER_DETAILS_BY_ID = {
  type: UserType,
  args: {
    auth_token: { type: GraphQLString },
  },
  async resolve(_: any, args: IGetUserDetailsById) {
    const decoded = jwt.verify(args.auth_token, JWT_SECRET as Secret);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    const userRepository = getRepository(User);
    const { id } = decoded as { id: string };

    const user = await userRepository.findOne({ id });

    if (!user) {
      throw new Error("User not found");
    }

    const transactionRepository = getRepository(Transaction);
    const transactions = await transactionRepository.find({ user });

    return {
      ...user,
      transactions,
    };
  },
};
