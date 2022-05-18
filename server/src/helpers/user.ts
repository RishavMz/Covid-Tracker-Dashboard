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
      await bcrypt.hash(args.password, 4).then(async (hash: any) => {
        const user = new User({
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: hash,
        });
        await user.save();
      });
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
    let data: Array<any> = [];
    await User.findOne({ email: args.email }).then(async (res: any) => {
      await bcrypt.compare(args.password, res.password).then(async(result) => {
        if (result === true) {
          data=await User.find({ email: args.email });
        }
      });
    });
    return data[0];
  },
};
