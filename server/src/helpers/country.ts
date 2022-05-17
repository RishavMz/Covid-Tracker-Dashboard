import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt} from "graphql";
import { Country } from "../models/country";

export const countryData = new GraphQLObjectType({
    name: "Country_data",
    description: "Country wise aggregate data",
    fields: () => ({
        countryID       :   { type: GraphQLNonNull( GraphQLInt )    },
        countryName     :   { type: GraphQLNonNull( GraphQLString ) },
        newConfirmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newRecovered    :  { type: GraphQLNonNull( GraphQLInt )     },
        totalconfirmed     :  { type: GraphQLNonNull( GraphQLInt )   }, 
        totalDeaths       :  { type: GraphQLNonNull( GraphQLInt )   }, 
        totalRecovered    :  { type: GraphQLNonNull( GraphQLInt )   } 
    })
});

export const addCountry = {
    addCountry : {
        type: countryData,
        description: "Add a new country to database",
        args: {
            countryName     :   { type: GraphQLNonNull( GraphQLString ) },
            newconfirmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
            newDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
            newRecovered    :  { type: GraphQLNonNull( GraphQLInt )     },
            totalconfirmed     :  { type: GraphQLNonNull( GraphQLInt )   }, 
            totalDeaths       :  { type: GraphQLNonNull( GraphQLInt )   }, 
            totalRecovered    :  { type: GraphQLNonNull( GraphQLInt )   } 
        },
        resolve: async(_parent: any, args: any) => {
            try {
                const country = new Country({ 
                    countryName     :   args.countryName,
                    newConfirmed    :   args.newConfirmed    ,
                    newDeaths       :   args.newDeaths       ,
                    newRecovered    :   args.newRecovered    ,
                    totalConfirmed  :   args.totalConfirmed    ,
                    totalDeaths     :   args.totalDeaths       ,
                    totalRecovered  :   args.totalRecovered
                })
                await country.save();
            } catch(err) {
                console.log(err);
            }
        }
    }
} 

// Individual country details: for analysis
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

// All country details : For comparison
export const getCountryAll  = {
    type: new GraphQLList(countryData),
    description: "Get all individual country details",
    resolve : async(_parent: any, _args: any) => {
        await Country.findOne({}, {countryName: 1, newConfirmed: 1, newDeaths: 1, newRecovered: 1, totalConfirmed: 1, totalDeaths: 1, totalRecovered: 1}).then((res)=> {
            return res;
        })
    }
}

