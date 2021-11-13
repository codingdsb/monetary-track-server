"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN = void 0;
const graphql_1 = require("graphql");
const AuthPayload_1 = require("../../typeDefs/AuthPayload");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../../../entities/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../../../constants");
exports.LOGIN = {
    type: AuthPayload_1.AuthPayloadType,
    args: {
        username_or_email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    },
    async resolve(_, args) {
        if (!args.username_or_email || !args.password) {
            throw new Error("Please provide username/email and password");
        }
        let user;
        user = await User_1.default.findOne({
            where: {
                username: args.username_or_email,
            },
        });
        if (!user) {
            user = await User_1.default.findOne({
                where: {
                    email: args.username_or_email,
                },
            });
            if (!user) {
                throw new Error("User not found with username/email");
            }
        }
        const isValidPassword = await bcryptjs_1.default.compare(args.password, user.password);
        if (!isValidPassword) {
            throw new Error("Password is not correct");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, constants_1.JWT_SECRET);
        return {
            token,
            user,
        };
    },
};
//# sourceMappingURL=index.js.map