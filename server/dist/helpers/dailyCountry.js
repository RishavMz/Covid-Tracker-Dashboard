"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountry = exports.getCountryDate = exports.addDailyCountryData = exports.dailyCountryData = void 0;
const graphql_1 = require("graphql");
const country_1 = require("../models/country");
exports.dailyCountryData = new graphql_1.GraphQLObjectType({
    name: "Daily_data",
    description: "Country wise data for each dat for determining trends",
    fields: () => ({
        date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        countryName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        newConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
    }),
});
exports.addDailyCountryData = {
    type: exports.dailyCountryData,
    description: "Add daily country stats for that particular day to database",
    args: {
        date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        countryName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        newConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dailyData = new country_1.Daily({
                date: args.date,
                countryName: args.countryName,
                newConfirmed: args.newConfirmed,
                newDeaths: args.newDeaths,
                newRecovered: args.newRecovered,
                totalConfirmed: args.totalConfirmed,
                totalDeaths: args.totalDeaths,
                totalRecovered: args.totalRecovered,
            });
            yield dailyData.save();
        }
        catch (err) {
            console.log(err);
        }
    }),
};
exports.getCountryDate = {
    type: new graphql_1.GraphQLList(exports.dailyCountryData),
    description: "Get country details by country name and date",
    args: {
        countryName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield country_1.Daily.find({ countryName: args.countryName, date: args.date });
    }),
};
exports.getCountry = {
    type: new graphql_1.GraphQLList(exports.dailyCountryData),
    description: "Get different date details by country",
    args: {
        countryName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield country_1.Daily.find({ countryName: args.countryName }).sort({
            date: 1,
        });
    }),
};
//# sourceMappingURL=dailyCountry.js.map