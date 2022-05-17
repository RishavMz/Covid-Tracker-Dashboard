import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { getCountry, getCountryAll } from "./helpers/country" ;

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

mongoose.connect(process.env.DATABASE_URL|| "");
const db = mongoose.connection;
db.on('error', (error) => console.log(error));

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        description: "Root query",
        fields : () => ({
            getCountry: getCountry,
            getCountryAll: getCountryAll
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