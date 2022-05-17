import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { GraphQLSchema, GraphQLObjectType } from "graphql";
const RootQuery = require("./rootQuery");

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQuery",
        fields: () => ({
            RootQuery
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