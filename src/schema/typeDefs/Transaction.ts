import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    with: { type: GraphQLString },
    transaction_type: { type: TransactionTypeEnum },
  }),
});

const TransactionTypeEnum = new GraphQLEnumType({
  name: "TransactionType",
  values: {
    INCOME: { value: "income" },
    EXPENSE: { value: "expense" },
  },
});
