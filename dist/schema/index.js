"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        login: queries_1.LOGIN,
    },
});
const MutationType = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        register: mutations_1.REGISTER,
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType,
});
//# sourceMappingURL=index.js.map