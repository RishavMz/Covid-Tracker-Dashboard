"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Daily = exports.Country = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dailySchema = new mongoose_1.default.Schema({
    date: {
        type: String,
        default: String(new Date().toJSON().slice(0, 4)) +
            "-" +
            String(new Date().toJSON().slice(5, 7)) +
            "-" +
            String(new Date().toJSON().slice(8, 10)),
        required: true,
    },
    countryName: {
        type: String,
    },
    newConfirmed: {
        type: Number,
        default: 0,
        required: true,
    },
    newDeaths: {
        type: Number,
        default: 0,
        required: true,
    },
    newRecovered: {
        type: Number,
        default: 0,
        required: true,
    },
    totalConfirmed: {
        type: Number,
        required: true,
    },
    totalDeaths: {
        type: Number,
        required: true,
    },
    totalRecovered: {
        type: Number,
        required: true,
    },
});
const countrySchema = new mongoose_1.default.Schema({
    countryName: {
        type: String,
        required: true
    },
    newConfirmed: {
        type: Number,
        default: 0,
    },
    newDeaths: {
        type: Number,
        default: 0,
    },
    newRecovered: {
        type: Number,
        default: 0,
    },
    totalConfirmed: {
        type: Number,
        required: true
    },
    totalDeaths: {
        type: Number,
        required: true
    },
    totalRecovered: {
        type: Number,
        required: true
    },
    dailyData: {
        type: [dailySchema]
    }
});
exports.Country = mongoose_1.default.model("Country", countrySchema);
exports.Daily = mongoose_1.default.model("Daily", dailySchema);
//# sourceMappingURL=country.js.map