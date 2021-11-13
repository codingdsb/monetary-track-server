import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { REGISTER } from "./mutations";
import { LOGIN } from "./queries";

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    login: LOGIN,
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: REGISTER,
  },
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
