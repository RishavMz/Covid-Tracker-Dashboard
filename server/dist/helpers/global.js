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
exports.getGlobal = exports.addGlobal = exports.dailyGlobalData = void 0;
const graphql_1 = require("graphql");
const global_1 = require("../models/global");
exports.dailyGlobalData = new graphql_1.GraphQLObjectType({
    name: "Global_Data",
    description: "Global data for each day for determining trends",
    fields: () => ({
        date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        newConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
    }),
});
exports.addGlobal = {
    type: exports.dailyGlobalData,
    description: "Add global aggregate data or a particular day to database",
    args: {
        id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        newConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalConfirmed: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalDeaths: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        newRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
        totalRecovered: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLInt) },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const global = new global_1.Global({
                date: args.date,
                newConfirmed: args.newConfirmed,
                totalConfirmed: args.totalConfirmed,
                newDeaths: args.newDeaths,
                totalDeaths: args.totalDeaths,
                newRecovered: args.newRecovered,
                totalRecovered: args.totalRecovered,
            });
            yield global.save();
        }
        catch (err) {
            console.log(err);
        }
    }),
};
exports.getGlobal = {
    type: exports.dailyGlobalData,
    description: "Get global details for a given day",
    args: {
        date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield global_1.Global.findOne({ date: args.date });
    }),
};
exports.getGlobalTrend = {
    type: new graphql_1.GraphQLList(exports.dailyGlobalData),
    description: "Get global details for a given trend",
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield global_1.Global.find();
    }),
  };
//# sourceMappingURL=global.js.map