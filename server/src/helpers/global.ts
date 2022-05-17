import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from "graphql";
import { Global } from "../models/global";

export const dailyGlobalData = new GraphQLObjectType({
    name: "Global_Data",
    description: "Global data for each day for determining trends",
    fields: () => ({
        id              :   { type : GraphQLNonNull( GraphQLInt)    },      
        date            :   { type : GraphQLNonNull( GraphQLString) },  
        newconfirmed     :   { type : GraphQLNonNull( GraphQLInt)    },
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
            newconfirmed     :   { type : GraphQLNonNull( GraphQLInt)    },
            totalConfirmed  :   { type : GraphQLNonNull( GraphQLInt)    },
            newDeaths       :   { type : GraphQLNonNull( GraphQLInt)    },
            totalDeaths     :   { type : GraphQLNonNull( GraphQLInt)    },
            newRecovered    :   { type : GraphQLNonNull( GraphQLInt)    },
            totalRecovered  :   { type : GraphQLNonNull( GraphQLInt)    }
        },
        resolve: async(_parent:any, args: any) => {
            try {
                const global = new Global({ 
                    date            :   args.date           ,  
                    newconfirmed     :   args.newconfirmed    ,
                    totalConfirmed  :   args.totalConfirmed ,
                    newDeaths       :   args.newDeaths      ,
                    totalDeaths     :   args.totalDeaths    ,
                    newRecovered    :   args.newRecovered   ,
                    totalRecovered  :   args.totalRecovered
                })
                await global.save();
            } catch(err) {
                console.log(err);
            }
        }
    }
} 

export const getGlobal  = {
    type: dailyGlobalData,
    description: "Get global details for a given day",
    args: {
        date: { type: GraphQLNonNull( GraphQLString ) }
    },
    resolve :async(_parent: any, args: any) => {
        await Global.findOne({ date: args.date }).then((res: any)=> {
            return res;
        })
    }
}