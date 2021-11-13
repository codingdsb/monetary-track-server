import { GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./User";

export const AuthPayloadType: GraphQLObjectType = new GraphQLObjectType({
  name: "AuthPayload",
  fields: () => ({
    token: { type: GraphQLString },
    user: { type: UserType },
  }),
});
