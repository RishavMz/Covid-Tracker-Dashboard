const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } = require("graphql");

const countryData : Object = new GraphQLObjectType({
    name: "Country_data",
    description: "Country wise aggregate data",
    fields: () => ({
        countryID       :   { type: GraphQLNonNull( GraphQLInt )    },
        countryName     :   { type: GraphQLNonNull( GraphQLString ) },
        totalConfirmed  :   { type: GraphQLNonNull( GraphQLInt )    },
        totalDeaths     :   { type: GraphQLNonNull( GraphQLInt )    },
        totalRecovered  :   { type: GraphQLNonNull( GraphQLInt )    }
    })
});

const addCountry : Object = {
    addCountry : {
        type: countryData,
        description: "Add a new country to database",
        args: {
            countryName     :   { type: GraphQLNonNull( GraphQLString ) },
            totalConfirmed  :   { type: GraphQLNonNull( GraphQLInt )    },
            totalDeaths     :   { type: GraphQLNonNull( GraphQLInt )    },
            totalRecovered  :   { type: GraphQLNonNull( GraphQLInt )    }
        },
        resolve: (parent, args) => {
            const country: Object = { 
                countryName     :   args.countryName    ,
                totalConfirmed  :   args.totalConfirmed ,
                totalDeaths     :   args.totalDeaths    ,
                totalRecovered  :   args.totalRecoveres
            }
            /*
                SQL Code to add data to table goes here
            */
            return country;
        }
    }
} 

const getCountry : Object = {
    getCountry : {
        type: countryData,
        description: "Get individual country details by country name",
        args: {
            countryName: { type: GraphQLNonNull( GraphQLString ) }
        },
        resolve : () => {
            let data : Object = {} ;
            /*
                SQL code to fetch data goes here
            */
            return data;
        }
    }
}

const getCountryAll : Object = {
    getCountryAll : {
        type: new GraphQLList(countryData),
        description: "Get all individual country details",
        resolve : () => {
            let data : Object = {} ;
            /*
                SQL code to fetch data goes here
            */
            return data;
        }
    }
}

module.exports = { countryData, addCountry, getCountry, getCountryAll };