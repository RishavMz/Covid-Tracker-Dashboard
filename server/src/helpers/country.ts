import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } from "graphql";

export const countryData = new GraphQLObjectType({
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

export const addCountry = {
    addCountry : {
        type: countryData,
        description: "Add a new country to database",
        args: {
            countryName     :   { type: GraphQLNonNull( GraphQLString ) },
            totalConfirmed  :   { type: GraphQLNonNull( GraphQLInt )    },
            totalDeaths     :   { type: GraphQLNonNull( GraphQLInt )    },
            totalRecovered  :   { type: GraphQLNonNull( GraphQLInt )    }
        },
        resolve: (_parent: any, args: any) => {
            const country = { 
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

export const getCountry  = {
    type: countryData,
    description: "Get individual country details by country name",
    args: {
        countryName: { type: GraphQLNonNull( GraphQLString ) }
    },
    resolve : () => {
        let data  = {} ;
        /*
            SQL code to fetch data goes here
        */
        return data;
    }

}

export const getCountryAll  = {
    type: new GraphQLList(countryData),
    description: "Get all individual country details",
    resolve : () => {
        let data  = {} ;
        /*
            SQL code to fetch data goes here
        */
        return data;
    }
}

