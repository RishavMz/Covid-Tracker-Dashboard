/*import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt} from "graphql";
import { Country } from "../models/country";

export const countryData = new GraphQLObjectType({
    name: "Country_data",
    description: "Country wise aggregate data",
    fields: () => ({
        countryName     :   { type: GraphQLNonNull( GraphQLString ) },
        newConfirmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newRecovered    :  { type: GraphQLNonNull( GraphQLInt )     },
        totalConfirmed     :  { type: GraphQLNonNull( GraphQLInt )   }, 
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
            newConfirmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
            newDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
            newRecovered    :  { type: GraphQLNonNull( GraphQLInt )     },
            totalConfirmed     :  { type: GraphQLNonNull( GraphQLInt )   }, 
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

*/
