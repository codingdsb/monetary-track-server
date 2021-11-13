"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPayloadType = void 0;
const graphql_1 = require("graphql");
const User_1 = require("./User");
exports.AuthPayloadType = new graphql_1.GraphQLObjectType({
    name: "AuthPayload",
    fields: () => ({
        token: { type: graphql_1.GraphQLString },
        user: { type: User_1.UserType },
    }),
});
//# sourceMappingURL=AuthPayload.js.map