import { GraphQLString } from "graphql";
import { AuthPayloadType } from "../../typeDefs/AuthPayload";
import { ILogin } from "./types";
import bcrypt from "bcryptjs";
import User from "../../../entities/User";
import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../../../constants";

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

    // check user by username
    user = await User.findOne({
      where: {
        username: args.username_or_email,
      },
    });

    if (!user) {
      // check user by email
      user = await User.findOne({
        where: {
          email: args.username_or_email,
        },
      });

      if (!user) {
        throw new Error("User not found with username/email");
      }
    }

    const isValidPassword = await bcrypt.compare(args.password, user.password);

    if (!isValidPassword) {
      throw new Error("Password is not correct");
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET as Secret);

    return {
      token,
      user,
    };
  },
};
