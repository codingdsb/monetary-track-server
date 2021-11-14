import { GraphQLString } from "graphql";
import User from "../../../entities/User";
import { AuthPayloadType } from "../../typeDefs/AuthPayload";
import { IRegister } from "./types";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../../../constants";

export const REGISTER = {
  type: AuthPayloadType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    confirm_password: { type: GraphQLString },
  },
  async resolve(_: any, args: IRegister) {
    if (
      !args.username ||
      !args.email ||
      !args.password ||
      !args.confirm_password
    ) {
      throw new Error("All fields are required");
    }

    if (args.password !== args.confirm_password) {
      throw new Error("Passwords do not match");
    }

    const userByUsername = await User.findOne({
      where: {
        username: args.username,
      },
    });

    if (userByUsername) {
      throw new Error("Username already taken");
    }

    const userByEmail = await User.findOne({
      where: {
        email: args.email,
      },
    });

    if (userByEmail) {
      throw new Error("An account already exists with that email");
    }

    if (args.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    if (args.username.length < 3 || args.username.length > 20) {
      throw new Error("Username must be between 3 and 20 characters long");
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Invalid email");
    }

    const user = new User();
    user.username = args.username;
    user.email = args.email;
    user.password = bcrypt.hashSync(args.password, 10);
    await user.save();

    const token = jwt.sign({ id: user?.id }, JWT_SECRET as Secret);

    return {
      token,
      user,
    };
  },
};
