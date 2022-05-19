"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const graphql_1 = require("graphql");
const dailyCountry_1 = require("./helpers/dailyCountry");
const country_1 = require("./helpers/country");
const user_1 = require("./helpers/user");
const global_1 = require("./helpers/global");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongoose_1.default.connect(process.env.DATABASE_URL || "");
const db = mongoose_1.default.connection;
db.on("error", (error) => console.log(error));
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        description: "Root query",
        fields: () => ({
            authUser: user_1.authUser,
            getCountry: dailyCountry_1.getCountry,
            getCountryAll: country_1.getCountryAll,
            getCountryDate: dailyCountry_1.getCountryDate,
            getGlobal: global_1.getGlobal,
        }),
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: "Mutation",
        description: "Root mutation",
        fields: () => ({
            addUser: user_1.addUser,
        }),
    }),
});
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema,
    graphiql: true,
}));
app.listen(PORT, () => {
    console.log("Server is up and listening on port " + PORT);
});
//# sourceMappingURL=index.js.map