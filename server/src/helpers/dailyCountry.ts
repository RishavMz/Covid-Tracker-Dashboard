import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from "graphql";
import { Country, Daily } from "../models/country";

export const dailyCountryData = new GraphQLObjectType({
    name: "Daily_data",
    description: "Country wise data for each dat for determining trends",
    fields: () => ({
        ID              :  { type: GraphQLNonNull( GraphQLInt )     },
        date            :  { type: GraphQLNonNull( GraphQLString )  },      
        newconfirmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newRecovered    :  { type: GraphQLNonNull( GraphQLInt )     },
        totalconfirmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
        totalDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
        totalRecovered    :  { type: GraphQLNonNull( GraphQLInt )     } 
    })
});

export const addDailyCountryData = {
    addDailyCountryData : {
        type: dailyCountryData,
        description: "Add daily country stats for that particular day to database",
        args: {
            date            :  { type: GraphQLNonNull( GraphQLString )  },      
            newconfirmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
            newDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
            newRecovered    :  { type: GraphQLNonNull( GraphQLInt )     },
            totalconfirmed   :  { type: GraphQLNonNull( GraphQLInt )     }, 
            totalDeaths     :  { type: GraphQLNonNull( GraphQLInt )     }, 
            totalRecovered  :  { type: GraphQLNonNull( GraphQLInt )     } 
        },
        resolve: async(_parent: any, args: any) => {
            try {
                const dailyData = new Daily({ 
                    date            :   args.date,
                    newConfirmed    :   args.newConfirmed    ,
                    newDeaths       :   args.newDeaths       ,
                    newRecovered    :   args.newRecovered    ,
                    totalConfirmed  :   args.totalConfirmed    ,
                    totalDeaths     :   args.totalDeaths       ,
                    totalRecovered  :   args.totalRecovered    
                });
                await dailyData.save().then(async()=>{
                    await Country.updateOne({countryName: args.countryName}, 
                    {
                        $push: {  dailyData: dailyData  }
                    });
                });
            } catch(err) {
                console.log(err);
            }
        }
    }
} 

