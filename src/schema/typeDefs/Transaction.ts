import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UserType } from "./User";

export const TransactionType: GraphQLObjectType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    with: { type: GraphQLString },
    transaction_type: { type: TransactionTypeEnum },
    user: { type: UserType },
  }),
});

const TransactionTypeEnum: GraphQLEnumType = new GraphQLEnumType({
  name: "TransactionType",
  values: {
    INCOME: { value: "income" },
    EXPENSE: { value: "expense" },
  },
});
