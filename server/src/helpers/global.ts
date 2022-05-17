import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from "graphql";

export const dailyGlobalData = new GraphQLObjectType({
    name: "Global_Data",
    description: "Global data for each day for determining trends",
    fields: () => ({
        id              :   { type : GraphQLNonNull( GraphQLInt)    },      
        date            :   { type : GraphQLNonNull( GraphQLString) },  
        newConfrmed     :   { type : GraphQLNonNull( GraphQLInt)    },
        totalConfirmed  :   { type : GraphQLNonNull( GraphQLInt)    },
        newDeaths       :   { type : GraphQLNonNull( GraphQLInt)    },
        totalDeaths     :   { type : GraphQLNonNull( GraphQLInt)    },
        newRecovered    :   { type : GraphQLNonNull( GraphQLInt)    },
        totalRecovered  :   { type : GraphQLNonNull( GraphQLInt)    }
    })   
});

export const addGlobal = {
    addGlobal : {
        type: dailyGlobalData,
        description: "Add global aggregate data or a particular day to database",
        args: {
            id              :   { type : GraphQLNonNull( GraphQLInt)    },      
            date            :   { type : GraphQLNonNull( GraphQLString) },  
            newConfrmed     :   { type : GraphQLNonNull( GraphQLInt)    },
            totalConfirmed  :   { type : GraphQLNonNull( GraphQLInt)    },
            newDeaths       :   { type : GraphQLNonNull( GraphQLInt)    },
            totalDeaths     :   { type : GraphQLNonNull( GraphQLInt)    },
            newRecovered    :   { type : GraphQLNonNull( GraphQLInt)    },
            totalRecovered  :   { type : GraphQLNonNull( GraphQLInt)    }
        },
        resolve: (_parent:any, args: any) => {
            const dailyAgg = { 
                id              :   args.id             ,      
                date            :   args.date           ,  
                newConfrmed     :   args.newConfrmed    ,
                totalConfirmed  :   args.totalConfirmed ,
                newDeaths       :   args.newDeaths      ,
                totalDeaths     :   args.totalDeaths    ,
                newRecovered    :   args.newRecovered   ,
                totalRecovered  :   args.totalRecovered
            }
            /*
                SQL Code to add data to table goes here
            */
            return dailyAgg;
        }
    }
} 

