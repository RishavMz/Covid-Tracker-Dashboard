const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } = require("graphql");

const dailyGlobalData = new GraphQLObjectType({
    name: "Global_Data",
    description: "Global data for each day for determining trends",
    fields: () => {
        id              :   { type : GraphQLNonNull( GraphQLInt)    },      
        date            :   { type : GraphQLNonNull( GraphQLString) },  
        newConfrmed     :   { type : GraphQLNonNull( GraphQLInt)    },
        totalConfirmed  :   { type : GraphQLNonNull( GraphQLInt)    },
        newDeaths       :   { type : GraphQLNonNull( GraphQLInt)    },
        totalDeaths     :   { type : GraphQLNonNull( GraphQLInt)    },
        newRecovered    :   { type : GraphQLNonNull( GraphQLInt)    },
        totalRecovered  :   { type : GraphQLNonNull( GraphQLInt)    }
    }   
});

const dailyCountryData = new GraphQLObjectType({
    name: "Daily_data",
    description: "Country wise data for each dat for determining trends",
    fields: () => {
        ID              :  { type: GraphQLNonNull( GraphQLInt )     },
        countryID       :  { type: GraphQLNonNull( GraphQLInt )     },
        date            :  { type: GraphQLNonNull( GraphQLString )  },      
        newConfrmed     :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newDeaths       :  { type: GraphQLNonNull( GraphQLInt )     }, 
        newRecovered    :  { type: GraphQLNonNull( GraphQLInt )     } 
    }
});

const countryData = new GraphQLObjectType({
    name: "Country_data",
    description: "Country wise aggregate data",
    fields: () => {
        countryID       :   { type: GraphQLNonNull( GraphQLInt )    },
        countryName     :   { type: GraphQLNonNull( GraphQLString ) },
        countryID       :   { type: GraphQLNonNull( GraphQLInt )    },
        totalConfirmed  :   { type: GraphQLNonNull( GraphQLInt )    },
        totalDeaths     :   { type: GraphQLNonNull( GraphQLInt )    },
        totalRecovered  :   { type: GraphQLNonNull( GraphQLInt )    }
    }
});

module.exports = { dailyGlobalData, dailyCountryData, countryData};