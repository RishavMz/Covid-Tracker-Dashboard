import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {
  getCountry,
  getCountryDate,
} from "./helpers/dailyCountry";
import { getCountryAll } from "./helpers/country";
import { addUser, authUser } from "./helpers/user";
import { getGlobal } from "./helpers/global";
import cors from "cors";

//import { fillData, getCountries } from "./services/fillData";
//console.log(getCountries);
//setTimeout(async() => {
//  await console.log(fillData);
//}, 2000);
//import { getCountries } from "./services/fillData";
//console.log(getCountries)

//import { fetchData } from "./services/getData";
//console.log(fetchData);


dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
      origin: "*",
  })
);

mongoose.connect(process.env.DATABASE_URL || "");
const db = mongoose.connection;
db.on("error", (error) => console.log(error));

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "Root query",
    fields: () => ({
      authUser: authUser,
      getCountry: getCountry,
      getCountryAll: getCountryAll,
      getCountryDate: getCountryDate,
      getGlobal: getGlobal,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    description: "Root mutation",
    fields: () => ({
      addUser: addUser,
    }),
  }),
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log("Server is up and listening on port " + PORT);
});
