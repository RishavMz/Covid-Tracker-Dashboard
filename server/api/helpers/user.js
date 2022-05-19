"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.addUser = exports.userData = void 0;
const graphql_1 = require("graphql");
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userData = new graphql_1.GraphQLObjectType({
    name: "User_Data",
    description: "User data for authentication",
    fields: () => ({
        firstname: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        lastname: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        password: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    }),
});
exports.addUser = {
    type: exports.userData,
    description: "Add user",
    args: {
        firstname: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        lastname: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        password: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield bcrypt_1.default.hash(args.password, 4).then((hash) => __awaiter(void 0, void 0, void 0, function* () {
                const user = new user_1.User({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    password: hash,
                });
                yield user.save();
            }));
        }
        catch (err) {
            console.log(err);
        }
    }),
};
exports.authUser = {
    type: exports.userData,
    description: "Authenticate user",
    args: {
        email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        password: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    },
    resolve: (_parent, args) => __awaiter(void 0, void 0, void 0, function* () {
        let data = [];
        yield user_1.User.findOne({ email: args.email }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            yield bcrypt_1.default.compare(args.password, res.password).then((result) => __awaiter(void 0, void 0, void 0, function* () {
                if (result === true) {
                    data = yield user_1.User.find({ email: args.email });
                }
            }));
        }));
        return data[0];
    }),
};
//# sourceMappingURL=user.js.map