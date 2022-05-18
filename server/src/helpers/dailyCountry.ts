import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { /*Country,*/ Daily } from "../models/country";

export const dailyCountryData = new GraphQLObjectType({
  name: "Daily_data",
  description: "Country wise data for each dat for determining trends",
  fields: () => ({
    date: { type: GraphQLNonNull(GraphQLString) },
    countryName: { type: GraphQLNonNull(GraphQLString) },
    newConfirmed: { type: GraphQLNonNull(GraphQLInt) },
    newDeaths: { type: GraphQLNonNull(GraphQLInt) },
    newRecovered: { type: GraphQLNonNull(GraphQLInt) },
    totalConfirmed: { type: GraphQLNonNull(GraphQLInt) },
    totalDeaths: { type: GraphQLNonNull(GraphQLInt) },
    totalRecovered: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

export const addDailyCountryData = {
  type: dailyCountryData,
  description: "Add daily country stats for that particular day to database",
  args: {
    date: { type: GraphQLNonNull(GraphQLString) },
    countryName: { type: GraphQLNonNull(GraphQLString) },
    newConfirmed: { type: GraphQLNonNull(GraphQLInt) },
    newDeaths: { type: GraphQLNonNull(GraphQLInt) },
    newRecovered: { type: GraphQLNonNull(GraphQLInt) },
    totalConfirmed: { type: GraphQLNonNull(GraphQLInt) },
    totalDeaths: { type: GraphQLNonNull(GraphQLInt) },
    totalRecovered: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (_parent: any, args: any) => {
    try {
      const dailyData = new Daily({
        date: args.date,
        countryName: args.countryName,
        newConfirmed: args.newConfirmed,
        newDeaths: args.newDeaths,
        newRecovered: args.newRecovered,
        totalConfirmed: args.totalConfirmed,
        totalDeaths: args.totalDeaths,
        totalRecovered: args.totalRecovered,
      });
      await dailyData.save(); /*.then(async()=>{
                    await Country.updateOne({countryName: args.countryName}, 
                    {
                        $push: {  dailyData: dailyData  }
                    });
                });*/
    } catch (err) {
      console.log(err);
    }
  },
};

export const getCountryDate = {
  type: new GraphQLList(dailyCountryData),
  description: "Get country details by country name and date",
  args: {
    countryName: { type: GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parent: any, args: any) => {
    return await Daily.find({ countryName: args.countryName, date: args.date });
  },
};

export const getCountryAll = {
  type: new GraphQLList(dailyCountryData),
  description: "Get all country details by date",
  args: {
    date: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parent: any, args: any) => {
    return await Daily.find({ date: args.date }).sort({ countryName: 1 });
  },
};

export const getCountry = {
  type: new GraphQLList(dailyCountryData),
  description: "Get different date details by country",
  args: {
    countryName: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parent: any, args: any) => {
    return await Daily.find({ countryName: args.countryName }).sort({
      date: 1,
    });
  },
};
