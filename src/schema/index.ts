import { GraphQLObjectType, GraphQLSchema } from "graphql";

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    //...
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //...
  },
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
