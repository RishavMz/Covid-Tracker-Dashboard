import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { getCountryAll, getCountry, getCountryDate } from "./helpers/dailyCountry" ;
import { getGlobal } from "./helpers/global";
import cors from "cors";

//import { initalizer } from "./services/getData";
//console.log(initalizer);

//import { fetchData } from "./services/getData";
//console.log(fetchData);

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL|| "");
const db = mongoose.connection;
db.on('error', (error) => console.log(error));

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        description: "Root query",
        fields : () => ({
            getCountry: getCountry,
            getCountryAll: getCountryAll,
            getCountryDate: getCountryDate,
            getGlobal : getGlobal
        })
    })
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log("Server is up and listening on port "+ PORT);
})