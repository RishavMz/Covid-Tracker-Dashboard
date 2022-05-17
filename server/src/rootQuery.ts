import { GraphQLObjectType } from "graphql";
import { getCountry, getCountryAll } from "./helpers/country";

export const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "Root query",
    fields : () => ({
        getCountry: getCountry,
        getCountryAll: getCountryAll
    })
});