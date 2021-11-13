"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const RootQueryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {},
});
const MutationType = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {},
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType,
});
//# sourceMappingURL=index.js.map