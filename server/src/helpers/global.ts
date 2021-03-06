import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { Global } from "../models/global";

export const dailyGlobalData = new GraphQLObjectType({
  name: "Global_Data",
  description: "Global data for each day for determining trends",
  fields: () => ({
    date: { type: GraphQLNonNull(GraphQLString) },
    newConfirmed: { type: GraphQLNonNull(GraphQLInt) },
    totalConfirmed: { type: GraphQLNonNull(GraphQLInt) },
    newDeaths: { type: GraphQLNonNull(GraphQLInt) },
    totalDeaths: { type: GraphQLNonNull(GraphQLInt) },
    newRecovered: { type: GraphQLNonNull(GraphQLInt) },
    totalRecovered: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

export const addGlobal = {
  type: dailyGlobalData,
  description: "Add global aggregate data or a particular day to database",
  args: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    date: { type: GraphQLNonNull(GraphQLString) },
    newConfirmed: { type: GraphQLNonNull(GraphQLInt) },
    totalConfirmed: { type: GraphQLNonNull(GraphQLInt) },
    newDeaths: { type: GraphQLNonNull(GraphQLInt) },
    totalDeaths: { type: GraphQLNonNull(GraphQLInt) },
    newRecovered: { type: GraphQLNonNull(GraphQLInt) },
    totalRecovered: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_parent: any, args: any) => {
    try {
      const global = new Global({
        date: args.date,
        newConfirmed: args.newConfirmed,
        totalConfirmed: args.totalConfirmed,
        newDeaths: args.newDeaths,
        totalDeaths: args.totalDeaths,
        newRecovered: args.newRecovered,
        totalRecovered: args.totalRecovered,
      });
      await global.save();
    } catch (err) {
      console.log(err);
    }
  },
};

export const getGlobal = {
  type: dailyGlobalData,
  description: "Get global details for a given day",
  args: {
    date: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parent: any, args: any) => {
    return await Global.findOne({ date: args.date });
  },
};

export const getGlobalTrend = {
  type: new GraphQLList(dailyGlobalData),
  description: "Get global details for a given trend",
  resolve: async (_parent: any, _args: any) => {
    return await Global.find();
  },
};
