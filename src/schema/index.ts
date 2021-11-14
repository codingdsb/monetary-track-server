import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { ADD_TRANSACTION, REGISTER } from "./mutations";
import { LOGIN, GET_USER_DETAILS_BY_ID } from "./queries";

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    login: LOGIN,
    getUserDetailsById: GET_USER_DETAILS_BY_ID,
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: REGISTER,
    addTransaction: ADD_TRANSACTION,
  },
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
