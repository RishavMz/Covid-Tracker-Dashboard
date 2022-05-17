import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt} from "graphql";
import { Country, /*Daily*/ } from "../models/country";

export const countryData = new GraphQLObjectType({
    name: "Country_data",
    description: "Country wise aggregate data",
    fields: () => ({
        countryID       :   { type: GraphQLNonNull( GraphQLInt )    },
        countryName     :   { type: GraphQLNonNull( GraphQLString ) },
    })
});

export const addCountry = {
    addCountry : {
        type: countryData,
        description: "Add a new country to database",
        args: {
            countryName     :   { type: GraphQLNonNull( GraphQLString ) },
        },
        resolve: async(_parent: any, args: any) => {
            try {
                const country = new Country({ 
                    countryName     :   args.countryName
                })
                await country.save();
            } catch(err) {
                console.log(err);
            }
        }
    }
} 

export const getCountry  = {
    type: countryData,
    description: "Get individual country details by country name",
    args: {
        countryName: { type: GraphQLNonNull( GraphQLString ) }
    },
    resolve :async(_parent: any, args: any) => {
        await Country.findOne({ countryName: args.countryName }).then((res)=> {
            return res;
        })
    }
}

export const getCountryAll  = {
    type: new GraphQLList(countryData),
    description: "Get all individual country details",
    resolve : async(_parent: any, _args: any) => {
        await Country.findOne({}, {countryName: 1}).then((res)=> {
            return res;
        })
    }
}

