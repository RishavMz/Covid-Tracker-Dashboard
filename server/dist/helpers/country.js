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
exports.getCountryAll = exports.addCountry = exports.countryData = void 0;
const graphql_1 = require("graphql");
const country_1 = require("../models/country");
exports.countryData = new graphql_1.GraphQLObjectType({
    name: "Country_data",
    description: "Country wise aggregate data",
    fields: () => ({
        countryName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        newConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) }
    })
});
exports.addCountry = {
    addCountry: {
        type: exports.countryData,
        description: "Add a new country to database",
        args: {
            countryName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            newConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
            newDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
            newRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
            totalConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
            totalDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
            totalRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) }
        },
        resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const country = new country_1.Country({
                    countryName: args.countryName,
                    newConfirmed: args.newConfirmed,
                    newDeaths: args.newDeaths,
                    newRecovered: args.newRecovered,
                    totalConfirmed: args.totalConfirmed,
                    totalDeaths: args.totalDeaths,
                    totalRecovered: args.totalRecovered
                });
                yield country.save();
            }
            catch (err) {
                console.log(err);
            }
        })
    }
};
exports.getCountryAll = {
    type: new graphql_1.GraphQLList(exports.countryData),
    description: "Get all country details by date",
    args: {
        date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    },
    resolve: (_parent, _args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield country_1.Country.find().sort({ countryName: 1 });
    }),
};
//# sourceMappingURL=country.js.map