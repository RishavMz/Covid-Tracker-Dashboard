import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { User } from "../models/user";
import bcrypt from "bcrypt";

export const userData = new GraphQLObjectType({
  name: "User_Data",
  description: "User data for authentication",
  fields: () => ({
    firstname: { type: GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export const addUser = {
  type: userData,
  description: "Add user",
  args: {
    firstname: { type: GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parent: any, args: any) => {
    try {
      bcrypt.hash(args.password, 16, function (_err: any, hash: any) {
        return { hash };
      });
      //const user = new User({
      //    firstname   : args.firstname,
      //    lastname    : args.lastname ,
      //    email       : args.email    ,
      //    password    : args.password
      //})
      //await user.save();
    } catch (err: any) {
      console.log(err);
    }
  },
};

export const authUser = {
  type: userData,
  description: "Authenticate user",
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parent: any, args: any) => {
    return await User.findOne({ email: args.email, password: args.password });
  },
};
