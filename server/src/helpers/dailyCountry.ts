import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from "graphql";

export const dailyCountryData = new GraphQLObjectType({
    name: "Daily_data",
    description: "Country wise data for each dat for determining trends",
    fields: () => ({
        ID              :  { type: GraphQLNonNull( GraphQLInt )     },
        countryID       :  { type: GraphQLNonNull( GraphQLInt )     },
        date            :  { type: GraphQLNonNull( GraphQLString )  },      
        newConfrmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newRecovered    :  { type: GraphQLNonNull( GraphQLInt )     } 
    })
});

export const addDailyCountryData = {
    addDailyCountryData : {
        type: dailyCountryData,
        description: "Add daily country stats for that particular day to database",
        args: {
            countryID       :   { type: GraphQLNonNull( GraphQLInt )    },
            countryName     :   { type: GraphQLNonNull( GraphQLString ) },
            newConfirmed    :   { type: GraphQLNonNull( GraphQLInt )    },
            newDeaths       :   { type: GraphQLNonNull( GraphQLInt )    },
            newRecovered    :   { type: GraphQLNonNull( GraphQLInt )    }
        },
        resolve: (_parent: any, args: any) => {
            const dailyData = { 
                countryID       :   args.countryID       ,
                countryName     :   args.countryName     ,
                newConfirmed    :   args.newConfirmed    ,
                newDeaths       :   args.newDeaths       ,
                newRecovered    :   args.newRecovered                
            }
            /*
                SQL Code to add data to table goes here
            */
            return dailyData;
        }
    }
} 

