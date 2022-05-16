const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const dotenv = require("dotenv").config();
const { dailyCountryData dailyGlobalData, countryData } = require ("./helpers/objects");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const PORT = process.env.PORT || 8000;
const app = express();

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "HelloWorld",
        fields: () => ({
            message: {
                type: GraphQLString,
                resolve: () => "Hello World"
            }
        })
    })
})

app.get("/", (req, res) => {
    res.send("Hello");
});
app.use("/graphql", expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log("Server is up and listening on port "+ PORT);
})