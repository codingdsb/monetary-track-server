"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTER = void 0;
const graphql_1 = require("graphql");
const User_1 = __importDefault(require("../../../entities/User"));
const AuthPayload_1 = require("../../typeDefs/AuthPayload");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../../../constants");
exports.REGISTER = {
    type: AuthPayload_1.AuthPayloadType,
    args: {
        username: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        confirm_password: { type: graphql_1.GraphQLString },
    },
    async resolve(_, args) {
        if (!args.username ||
            !args.email ||
            !args.password ||
            !args.confirm_password) {
            throw new Error("All fields are required");
        }
        if (args.password !== args.confirm_password) {
            throw new Error("Passwords do not match");
        }
        const userByUsername = await User_1.default.findOne({
            where: {
                username: args.username,
            },
        });
        if (userByUsername) {
            throw new Error("Username already taken");
        }
        const userByEmail = await User_1.default.findOne({
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
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(args.email)) {
            throw new Error("Invalid email");
        }
        await User_1.default.insert({
            username: args.username,
            email: args.email,
            password: bcryptjs_1.default.hashSync(args.password, 10),
        });
        const user = await User_1.default.findOne({
            where: {
                username: args.username,
                email: args.email,
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, constants_1.JWT_SECRET);
        return {
            token,
            user,
        };
    },
};
//# sourceMappingURL=index.js.map