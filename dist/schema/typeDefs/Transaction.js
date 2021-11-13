"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = void 0;
const graphql_1 = require("graphql");
const User_1 = require("./User");
exports.TransactionType = new graphql_1.GraphQLObjectType({
    name: "Transaction",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        amount: { type: graphql_1.GraphQLFloat },
        description: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
        with: { type: graphql_1.GraphQLString },
        transaction_type: { type: TransactionTypeEnum },
        user: { type: User_1.UserType },
    }),
});
const TransactionTypeEnum = new graphql_1.GraphQLEnumType({
    name: "TransactionType",
    values: {
        INCOME: { value: "income" },
        EXPENSE: { value: "expense" },
    },
});
//# sourceMappingURL=Transaction.js.map